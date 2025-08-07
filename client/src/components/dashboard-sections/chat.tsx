import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";

export default function ChatSection() {
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/chat", user?.id],
    enabled: !!user,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      return apiRequest("POST", "/api/chat", {
        userId: user?.id,
        sender: "user",
        message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat", user?.id] });
      setMessageInput("");
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    sendMessageMutation.mutate(messageInput);
  };

  const handleQuickMessage = (message: string) => {
    sendMessageMutation.mutate(message);
  };

  const quickMessages = [
    "I'm feeling anxious",
    "I need help with ADHD", 
    "I want to talk to someone",
    "I'm having a hard day"
  ];

  return (
    <div className="h-full flex flex-col" data-testid="chat-section">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-primary-500 p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">AI Assistant</h2>
        <p className="opacity-90">I'm here to help you find the right mental health support. Tell me how you're feeling today.</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-96 max-h-96" data-testid="chat-messages">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full chat-bubble-ai flex items-center justify-center">
              <Bot className="text-white h-4 w-4" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-md">
              <p className="text-sage-700">
                Hi {user?.firstName}! I'm here to help you schedule an appointment that fits your needs. 
                How are you feeling today, and what kind of support would be most helpful?
              </p>
            </div>
          </div>
        )}

        {messages.map((message: ChatMessage) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === "user" ? "justify-end" : ""
            }`}
            data-testid={`chat-message-${message.sender}-${message.id}`}
          >
            {message.sender === "user" ? (
              <>
                <div className="chat-bubble-user rounded-2xl rounded-tr-sm p-4 max-w-md text-white">
                  <p>{message.message}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <User className="text-white h-4 w-4" />
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full chat-bubble-ai flex items-center justify-center">
                  <Bot className="text-white h-4 w-4" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-md">
                  <p className="text-sage-700">{message.message}</p>
                </div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-sage-100">
        <div className="flex space-x-3">
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message here..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={sendMessageMutation.isPending}
            data-testid="input-chat-message"
          />
          <Button
            onClick={handleSendMessage}
            disabled={sendMessageMutation.isPending}
            className="bg-primary-500 hover:bg-primary-600"
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {quickMessages.map((message) => (
            <Button
              key={message}
              variant="outline"
              size="sm"
              onClick={() => handleQuickMessage(message)}
              disabled={sendMessageMutation.isPending}
              className="text-sm bg-sage-100 text-sage-700 hover:bg-sage-200 border-sage-300"
              data-testid={`button-quick-${message.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
