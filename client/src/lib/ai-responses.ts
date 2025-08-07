export interface AIResponse {
  message: string;
  suggestions?: string[];
  recommendedActions?: {
    label: string;
    action: string;
    data?: any;
  }[];
}

export class AIResponseService {
  private static instance: AIResponseService;

  static getInstance(): AIResponseService {
    if (!AIResponseService.instance) {
      AIResponseService.instance = new AIResponseService();
    }
    return AIResponseService.instance;
  }

  generateResponse(userMessage: string, context?: any): AIResponse {
    const message = userMessage.toLowerCase();
    
    // Anxiety-related responses
    if (this.containsKeywords(message, ['anxious', 'anxiety', 'worry', 'worried', 'panic', 'nervous'])) {
      return this.getAnxietyResponse();
    }
    
    // ADHD-related responses
    if (this.containsKeywords(message, ['adhd', 'attention', 'focus', 'concentrate', 'hyperactive', 'distracted'])) {
      return this.getADHDResponse();
    }
    
    // Depression-related responses
    if (this.containsKeywords(message, ['depressed', 'depression', 'sad', 'down', 'hopeless', 'empty'])) {
      return this.getDepressionResponse();
    }
    
    // Autism-related responses
    if (this.containsKeywords(message, ['autism', 'autistic', 'sensory', 'stimming', 'meltdown', 'overwhelmed'])) {
      return this.getAutismResponse();
    }
    
    // Social skills responses
    if (this.containsKeywords(message, ['social', 'friends', 'lonely', 'isolated', 'shy', 'awkward'])) {
      return this.getSocialResponse();
    }
    
    // Crisis-related responses
    if (this.containsKeywords(message, ['crisis', 'emergency', 'help', 'urgent', 'suicide', 'harm', 'hurt'])) {
      return this.getCrisisResponse();
    }
    
    // General talking/counseling
    if (this.containsKeywords(message, ['talk', 'someone', 'listen', 'counsel', 'therapy', 'therapist'])) {
      return this.getGeneralCounselingResponse();
    }
    
    // Default response
    return this.getDefaultResponse();
  }

  private containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  private getAnxietyResponse(): AIResponse {
    const responses = [
      "I understand you're feeling anxious. That's completely valid, and you're brave for reaching out. Anxiety can feel overwhelming, but there are specialists who understand exactly what you're going through.",
      "Anxiety affects many teens, especially those who are neurodivergent. You're not alone in this. I can help you find a specialist who works specifically with anxiety and understands your unique needs.",
      "Thank you for sharing that you're feeling anxious. It takes courage to reach out. I'd like to connect you with someone who can provide the right support and coping strategies."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "I'd like to schedule an appointment soon",
        "Can you recommend breathing techniques?",
        "What types of therapy help with anxiety?"
      ],
      recommendedActions: [
        {
          label: "Find Anxiety Specialist",
          action: "book_appointment",
          data: { supportType: "anxiety" }
        },
        {
          label: "Learn Coping Techniques",
          action: "resource_link",
          data: { type: "anxiety_resources" }
        }
      ]
    };
  }

  private getADHDResponse(): AIResponse {
    const responses = [
      "ADHD can present unique challenges, but with the right support, you can develop great strategies to work with your brain, not against it. I can connect you with specialists who understand ADHD in teens.",
      "Managing ADHD involves understanding your strengths and finding systems that work for you. Our ADHD specialists are experienced in helping teens develop executive function skills and coping strategies.",
      "ADHD support is really important, and I'm glad you're seeking help. The right specialist can help you understand your brain better and develop personalized strategies."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "I need help with focus and organization",
        "Can someone help with ADHD medication questions?",
        "I want to learn study strategies"
      ],
      recommendedActions: [
        {
          label: "ADHD Specialist",
          action: "book_appointment",
          data: { supportType: "adhd" }
        },
        {
          label: "Executive Function Resources",
          action: "resource_link",
          data: { type: "adhd_resources" }
        }
      ]
    };
  }

  private getDepressionResponse(): AIResponse {
    const responses = [
      "I hear that you're struggling with depression, and I want you to know that reaching out is a significant step. Depression can feel isolating, but you don't have to go through this alone.",
      "Depression affects many teens, and it's important to get the right support. Our counselors understand the unique challenges teens face and can provide a safe, understanding space.",
      "Thank you for trusting me with how you're feeling. Depression is treatable, and there are caring professionals who can help you work through these difficult feelings."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "I need someone to talk to regularly",
        "How can therapy help with depression?",
        "I'm having trouble with daily activities"
      ],
      recommendedActions: [
        {
          label: "Find Counselor",
          action: "book_appointment",
          data: { supportType: "depression" }
        },
        {
          label: "Crisis Resources",
          action: "crisis_resources"
        }
      ]
    };
  }

  private getAutismResponse(): AIResponse {
    const responses = [
      "Autism brings unique strengths and challenges, and it's wonderful that you're seeking support. Our autism specialists understand sensory needs, communication preferences, and can help with strategies that work for you.",
      "Every autistic person is different, and finding the right support means finding someone who understands your specific needs and strengths. I can connect you with specialists who celebrate neurodiversity.",
      "Autism support should be strengths-based and understanding of your unique perspective. Our specialists work with you to build on your strengths while addressing any challenges."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "I need help with sensory issues",
        "Can someone help with social situations?",
        "I want support that understands autism"
      ],
      recommendedActions: [
        {
          label: "Autism Specialist",
          action: "book_appointment",
          data: { supportType: "autism" }
        },
        {
          label: "Sensory Support Resources",
          action: "resource_link",
          data: { type: "autism_resources" }
        }
      ]
    };
  }

  private getSocialResponse(): AIResponse {
    const responses = [
      "Social connections can be challenging, especially during the teen years. It's completely normal to feel this way, and there are specialists who can help you develop social skills and confidence.",
      "Building social skills and connections takes practice, and it's okay to need support with this. Our counselors can help you develop strategies and work through social anxiety.",
      "Social challenges are common among neurodivergent teens. With the right support, you can build meaningful connections and develop social confidence."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "I want to make friends but don't know how",
        "Can someone help with social anxiety?",
        "I need practice with social situations"
      ],
      recommendedActions: [
        {
          label: "Social Skills Support",
          action: "book_appointment",
          data: { supportType: "social" }
        },
        {
          label: "Social Groups",
          action: "resource_link",
          data: { type: "social_resources" }
        }
      ]
    };
  }

  private getCrisisResponse(): AIResponse {
    return {
      message: "I'm concerned about you and want to make sure you get immediate support. If you're in crisis or having thoughts of harming yourself, please reach out to a crisis line right away. You can call 988 (Suicide & Crisis Lifeline) or text 'HELLO' to 741741 (Crisis Text Line). These services are available 24/7.",
      suggestions: [
        "I need immediate help",
        "Can you connect me with crisis support?",
        "I want to talk to someone right now"
      ],
      recommendedActions: [
        {
          label: "Call Crisis Line (988)",
          action: "external_link",
          data: { url: "tel:988" }
        },
        {
          label: "Crisis Text Line",
          action: "external_link",
          data: { url: "sms:741741" }
        },
        {
          label: "Emergency Services",
          action: "external_link",
          data: { url: "tel:911" }
        }
      ]
    };
  }

  private getGeneralCounselingResponse(): AIResponse {
    const responses = [
      "Sometimes we just need someone to listen and understand, and that's perfectly okay. I can help you find a counselor who specializes in working with teens and creates a safe, supportive environment.",
      "Having someone to talk to can make a huge difference. Our teen counselors are trained to understand the unique challenges you face and provide non-judgmental support.",
      "It sounds like you could benefit from talking to someone supportive. I can help match you with a counselor whose approach and style would be a good fit for you."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "I just need someone who will listen",
        "What's the difference between types of therapy?",
        "How do I know if a therapist is right for me?"
      ],
      recommendedActions: [
        {
          label: "Find Teen Counselor",
          action: "book_appointment",
          data: { supportType: "general" }
        },
        {
          label: "Learn About Therapy Types",
          action: "resource_link",
          data: { type: "therapy_info" }
        }
      ]
    };
  }

  private getDefaultResponse(): AIResponse {
    const responses = [
      "Thank you for reaching out. I'm here to help you find the right mental health support. Could you tell me a bit more about what's been on your mind lately?",
      "I appreciate you sharing with me. Every person's needs are unique, and I want to make sure we find someone who's the right fit for you. What would feel most helpful right now?",
      "I'm here to help you navigate your mental health journey. What kind of support are you looking for today? Whether it's someone to talk to, help with specific challenges, or just exploring your options - I'm here to guide you."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "I'm feeling anxious",
        "I need help with ADHD",
        "I just want to talk to someone",
        "I'm not sure what I need"
      ],
      recommendedActions: [
        {
          label: "Explore Support Options",
          action: "show_support_types"
        },
        {
          label: "Take Assessment",
          action: "needs_assessment"
        }
      ]
    };
  }
}

export const aiResponseService = AIResponseService.getInstance();
