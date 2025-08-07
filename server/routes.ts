import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAppointmentSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Appointment routes
  app.get("/api/appointments/:userId", async (req, res) => {
    try {
      const appointments = await storage.getAppointments(req.params.userId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Invalid appointment data" });
    }
  });

  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      const updates = req.body;
      const appointment = await storage.updateAppointment(req.params.id, updates);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAppointment(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json({ message: "Appointment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Chat routes
  app.get("/api/chat/:userId", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(messageData);
      
      // Generate AI response if user message
      if (messageData.sender === 'user') {
        const aiResponse = generateAIResponse(messageData.message);
        const aiMessage = await storage.createChatMessage({
          userId: messageData.userId,
          sender: 'ai',
          message: aiResponse,
        });
        res.json({ userMessage: message, aiMessage });
      } else {
        res.json(message);
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // AI recommendation endpoint
  app.post("/api/ai/recommend", async (req, res) => {
    try {
      const { supportType, userId } = req.body;
      const recommendation = generateAppointmentRecommendation(supportType);
      res.json(recommendation);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // In a real app, this would send an email or save to database
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('anxious') || message.includes('anxiety') || message.includes('worry')) {
    return "I understand you're feeling anxious. That's completely valid. I can help you find a specialist who works specifically with anxiety in teens. Would you prefer to talk to someone today, or would you like to schedule for later this week?";
  } else if (message.includes('adhd') || message.includes('attention') || message.includes('focus')) {
    return "ADHD support is really important, and I'm glad you're seeking help. I can connect you with specialists who understand neurodivergent teens. Dr. Sarah Johnson has great reviews from other teens with ADHD. Would you like me to check her availability?";
  } else if (message.includes('talk') || message.includes('someone') || message.includes('listen')) {
    return "Sometimes we just need someone to listen, and that's perfectly okay. I can help you find a counselor who specializes in working with teens. Alex Chen, LCSW, is really understanding and has great availability this week. Would you like to see their schedule?";
  } else if (message.includes('depressed') || message.includes('depression') || message.includes('sad')) {
    return "I hear that you're going through a difficult time. Depression can feel overwhelming, but reaching out for help is a brave and important step. I can connect you with therapists who specialize in teen depression and understand what you're experiencing.";
  } else if (message.includes('autism') || message.includes('autistic')) {
    return "I can help you find specialists who understand autism and work specifically with neurodivergent teens. Dr. Raj Patel has extensive experience with autism spectrum support and uses a strengths-based approach. Would you like to learn more about their methods?";
  } else {
    return "Thank you for sharing that with me. To help me find the best support for you, could you tell me a bit more about what's been on your mind lately? This will help me match you with the most suitable specialist.";
  }
}

function generateAppointmentRecommendation(supportType: string) {
  const specialists = {
    anxiety: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Anxiety & ADHD Specialist',
      availability: ['2:00 PM', '4:00 PM'],
      approach: 'CBT and mindfulness techniques',
      rating: '4.9/5'
    },
    adhd: {
      name: 'Dr. Sarah Johnson',
      specialty: 'ADHD & Executive Function',
      availability: ['10:00 AM', '3:00 PM'],
      approach: 'ADHD coaching and executive function skills',
      rating: '4.9/5'
    },
    autism: {
      name: 'Dr. Raj Patel',
      specialty: 'Autism Spectrum Support',
      availability: ['11:00 AM', '2:00 PM'],
      approach: 'Strengths-based autism support',
      rating: '4.8/5'
    },
    depression: {
      name: 'Maria Garcia, MFT',
      specialty: 'Teen Depression Specialist',
      availability: ['9:00 AM', '1:00 PM'],
      approach: 'Cognitive behavioral therapy',
      rating: '4.9/5'
    },
    general: {
      name: 'Alex Chen, LCSW',
      specialty: 'Teen Counselor',
      availability: ['9:00 AM', '4:00 PM'],
      approach: 'Person-centered therapy',
      rating: '4.9/5'
    }
  };

  return specialists[supportType as keyof typeof specialists] || specialists.general;
}
