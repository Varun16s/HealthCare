import { Appointment, ChatMessage } from "@shared/schema";

export class LocalStorageService {
  private static instance: LocalStorageService;

  static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  // Appointments
  saveAppointments(appointments: Appointment[]): void {
    localStorage.setItem('mindmap_appointments', JSON.stringify(appointments));
  }

  getAppointments(): Appointment[] {
    const data = localStorage.getItem('mindmap_appointments');
    if (!data) return [];
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing appointments from localStorage:', error);
      return [];
    }
  }

  // Chat history
  saveChatHistory(messages: ChatMessage[]): void {
    localStorage.setItem('mindmap_chat', JSON.stringify(messages));
  }

  getChatHistory(): ChatMessage[] {
    const data = localStorage.getItem('mindmap_chat');
    if (!data) return [];
    
    try {
      const messages = JSON.parse(data);
      // Convert timestamp strings back to Date objects
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
      }));
    } catch (error) {
      console.error('Error parsing chat history from localStorage:', error);
      return [];
    }
  }

  // Dashboard preferences
  saveDashboardPreferences(preferences: Record<string, any>): void {
    localStorage.setItem('mindmap_dashboard_prefs', JSON.stringify(preferences));
  }

  getDashboardPreferences(): Record<string, any> {
    const data = localStorage.getItem('mindmap_dashboard_prefs');
    if (!data) return {};
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing dashboard preferences from localStorage:', error);
      return {};
    }
  }

  // Clear all data
  clearAllData(): void {
    localStorage.removeItem('mindmap_user');
    localStorage.removeItem('mindmap_appointments');
    localStorage.removeItem('mindmap_chat');
    localStorage.removeItem('mindmap_dashboard_prefs');
  }
}

export const storageService = LocalStorageService.getInstance();
