import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, ChatbotState, ConversationContext } from '@/types/chatbot';
import { groqService } from '@/services/groqService';
import { contextService } from '@/services/contextService';

const STORAGE_KEY = 'chatbot_conversation';
const STORAGE_VERSION = '1.0';

interface StoredConversation {
  version: string;
  messages: ChatMessage[];
  context: ConversationContext;
  timestamp: number;
}

export const useChatbot = () => {
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isLoading: false,
    messages: [],
    context: {
      userIntent: 'general',
      previousQuestions: []
    },
    isTyping: false
  });

  const messageIdCounter = useRef(0);
  const isInitialized = useRef(false);

  // Load conversation from localStorage
  const loadConversation = useCallback((): StoredConversation | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed: StoredConversation = JSON.parse(stored);

      // Check version compatibility
      if (parsed.version !== STORAGE_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      // Check if conversation is not too old (24 hours)
      const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
      if (isExpired) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      // Convert timestamp strings back to Date objects
      const messages = parsed.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));

      return { ...parsed, messages };
    } catch (error) {
      console.error('Error loading conversation:', error);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }, []);

  // Save conversation to localStorage
  const saveConversation = useCallback((messages: ChatMessage[], context: ConversationContext) => {
    try {
      const toSave: StoredConversation = {
        version: STORAGE_VERSION,
        messages,
        context,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }, []);

  // Initialize conversation from localStorage
  useEffect(() => {
    if (isInitialized.current) return;

    const stored = loadConversation();
    if (stored && stored.messages.length > 0) {
      setState(prev => ({
        ...prev,
        messages: stored.messages,
        context: stored.context
      }));

      // Update message counter to avoid ID conflicts
      const lastId = stored.messages[stored.messages.length - 1]?.id;
      if (lastId) {
        const match = lastId.match(/_(\d+)$/);
        if (match) {
          messageIdCounter.current = parseInt(match[1]);
        }
      }
    }

    isInitialized.current = true;
  }, [loadConversation]);

  // Save conversation when messages or context change
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isInitialized.current) return;

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce saving to avoid too frequent writes (increased delay)
    saveTimeoutRef.current = setTimeout(() => {
      saveConversation(state.messages, state.context);
    }, 1000); // Increased from 500ms to 1000ms

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.messages, state.context, saveConversation]);

  const generateMessageId = () => `msg_${Date.now()}_${++messageIdCounter.current}`;

  const addMessage = useCallback((content: string, role: 'user' | 'assistant', metadata?: any) => {
    const message: ChatMessage = {
      id: generateMessageId(),
      content,
      role,
      timestamp: new Date(),
      metadata
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));

    return message;
  }, []);

  const updateContext = useCallback((updates: Partial<ConversationContext>) => {
    setState(prev => ({
      ...prev,
      context: { ...prev.context, ...updates }
    }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading) return;

    // Add user message
    addMessage(content, 'user');
    
    setState(prev => ({ ...prev, isLoading: true, isTyping: true }));

    try {
      // Analyze user intent
      const intent = await groqService.analyzeUserIntent(content);
      
      // Update context
      const newContext: ConversationContext = {
        ...state.context,
        userIntent: intent,
        previousQuestions: [...state.context.previousQuestions, content].slice(-5) // Keep last 5 questions
      };

      updateContext(newContext);

      // Build context for the query
      const additionalContext = await contextService.buildContextForQuery(content, newContext);

      // Generate response
      const response = await groqService.generateResponse(
        [...state.messages, { id: generateMessageId(), content, role: 'user', timestamp: new Date() }],
        newContext,
        additionalContext
      );

      setState(prev => ({ ...prev, isTyping: false }));

      if (response.success && response.data) {
        // Add assistant response
        const assistantMessage = addMessage(
          response.data.message,
          'assistant',
          {
            responseTime: Date.now(),
            projectContext: response.data.projectReferences,
            suggestedQuestions: response.data.suggestedQuestions
          }
        );

        // Store suggested questions for UI
        setState(prev => ({
          ...prev,
          suggestedQuestions: response.data?.suggestedQuestions || [],
          lastResponseMetadata: response.data
        }));

      } else {
        addMessage(
          "I apologize, but I'm having trouble processing your request right now. Please try again or ask me something else about Dhruba's projects and experience.",
          'assistant'
        );
      }

    } catch (error) {
      setState(prev => ({ ...prev, isTyping: false }));
      addMessage(
        "I encountered an error while processing your message. Please try again.",
        'assistant'
      );
      console.error('Chatbot error:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.messages, state.context, state.isLoading, addMessage, updateContext]);

  const toggleChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));

    // Send welcome message if opening for the first time
    if (!state.isOpen && state.messages.length === 0) {
      setTimeout(() => {
        addMessage(
          "👋 Hi! I'm Dhruba's AI assistant. I can tell you about his projects, technical expertise, and development approach. What would you like to know?",
          'assistant',
          { suggestedQuestions: [
            "Tell me about Dhruba's major projects",
            "How does AI orchestration work?",
            "What technologies does he specialize in?",
            "How can I contact Dhruba?"
          ]}
        );
      }, 500);
    }
  }, [state.isOpen, state.messages.length, addMessage]);

  const clearChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      messages: [],
      context: {
        userIntent: 'general',
        previousQuestions: []
      }
    }));

    // Clear localStorage as well
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const closeChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const sendSuggestedQuestion = useCallback((question: string) => {
    sendMessage(question);
  }, [sendMessage]);

  // Predefined quick questions
  const quickQuestions = [
    "What are Dhruba's major projects?",
    "How does AI orchestration work?",
    "Tell me about the Event Manager",
    "What's special about GitIQ?",
    "How was this portfolio built?",
    "What technologies does he use?",
    "How can I hire Dhruba?",
    "What's his development process?"
  ];

  return {
    // State
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    isTyping: state.isTyping,
    messages: state.messages,
    context: state.context,
    error: state.error,
    
    // Actions
    sendMessage,
    toggleChat,
    clearChat,
    closeChat,
    sendSuggestedQuestion,
    
    // Utilities
    quickQuestions,
    messageCount: state.messages.length,
    lastMessage: state.messages[state.messages.length - 1],
    
    // Suggested questions from last response
    suggestedQuestions: (state as any).suggestedQuestions || []
  };
};
