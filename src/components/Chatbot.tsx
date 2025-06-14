import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Minimize2,
  Zap
} from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import { ChatMessage } from '@/types/chatbot';

const Chatbot: React.FC = () => {
  const {
    isOpen,
    isLoading,
    isTyping,
    messages,
    sendMessage,
    toggleChat,
    sendSuggestedQuestion,
    quickQuestions
  } = useChatbot();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, []);

  const scrollToLastMessage = useCallback(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        // Try to scroll to the beginning of the AI response
        const messageElement = document.querySelector(`[data-message-id="${lastMessage.id}"]`);
        if (messageElement && messagesEndRef.current) {
          const container = messagesEndRef.current.parentElement;
          if (container) {
            const elementTop = (messageElement as HTMLElement).offsetTop;
            container.scrollTop = elementTop - 20; // Small offset from top
            return;
          }
        }
      }
    }
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Track previous message count to avoid unnecessary scrolling
  const prevMessageCountRef = useRef(messages.length);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isTypingRef = useRef(isTyping);

  // Update typing ref without causing re-renders
  useEffect(() => {
    isTypingRef.current = isTyping;
  }, [isTyping]);

  // Only scroll when messages actually change (not during typing)
  useEffect(() => {
    const currentMessageCount = messages.length;
    const hasNewMessage = currentMessageCount > prevMessageCountRef.current;

    // Only scroll if we have new messages, not during typing
    if (hasNewMessage) {
      // Clear any existing scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Scroll after a short delay to ensure message is rendered
      scrollTimeoutRef.current = setTimeout(() => {
        scrollToLastMessage();
      }, 150);
    }

    prevMessageCountRef.current = currentMessageCount;

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [messages.length, scrollToLastMessage]);

  // Separate effect for typing indicator scroll (only when typing starts)
  useEffect(() => {
    if (isTyping && !isTypingRef.current) {
      // Only scroll when typing starts, not while continuing to type
      const timeoutId = setTimeout(() => {
        if (messagesEndRef.current) {
          const container = messagesEndRef.current.parentElement;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [isTyping]);

  // Scroll to last message when chat is opened (with existing conversation)
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Add a delay to ensure the chat window is fully rendered
      const timeoutId = setTimeout(() => {
        scrollToLastMessage();
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]); // Removed messages.length dependency to prevent re-triggering

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  }, [inputValue, isLoading, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-cyber-blue/20 px-1 rounded text-cyber-blue">$1</code>')
      .replace(/\n/g, '<br>');
  };

  const MessageComponent: React.FC<{ message: ChatMessage }> = React.memo(({ message }) => (
    <div
      className={`flex gap-3 mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
      data-message-id={message.id}
    >
      {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        message.role === 'user' 
          ? 'bg-gradient-to-br from-cyber-blue to-cyber-purple text-white' 
          : 'glass-card text-gray-100'
      }`}>
        <div 
          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
          className="text-sm leading-relaxed"
        />
        
        {message.role === 'assistant' && (message.metadata as any)?.suggestedQuestions && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {(message.metadata as any).suggestedQuestions.slice(0, 2).map((question: string, index: number) => (
                <button
                  key={index}
                  onClick={() => sendSuggestedQuestion(question)}
                  className="text-xs px-2 py-1 rounded-lg bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {message.role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-300" />
        </div>
      )}
    </div>
  ));

  const TypingIndicator = React.memo(() => (
    <div className="flex gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="glass-card px-4 py-3 rounded-2xl">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 md:bottom-6 md:right-6 bottom-24 z-50 w-14 h-14 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full shadow-2xl flex items-center justify-center hover:shadow-cyber-blue/25 transition-all duration-300"
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 md:bottom-6 md:right-6 bottom-24 z-50 w-96 h-[600px] md:w-96 w-[calc(100vw-2rem)] md:h-[600px] h-[calc(100vh-200px)] bg-black/90 backdrop-blur-xl border border-cyber-blue/30 rounded-2xl shadow-2xl overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-white text-sm">Dhruba AI Assistant</h3>
                  <p className="text-xs text-gray-400">AI-Orchestrated Developer Expert</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{
                    height: 'calc(100% - 140px)',
                    scrollBehavior: 'auto',
                    overflowAnchor: 'none'
                  }}
                >
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
                      <p className="text-gray-400 text-sm mb-4">
                        Hi! I'm Dhruba's AI assistant. Ask me anything about his projects and expertise!
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {quickQuestions.slice(0, 4).map((question, index) => (
                          <button
                            key={index}
                            onClick={() => sendSuggestedQuestion(question)}
                            className="text-xs px-3 py-2 rounded-lg bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 transition-colors text-left"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <MessageComponent key={message.id} message={message} />
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about projects, skills, or anything..."
                      disabled={isLoading}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue/50 focus:ring-1 focus:ring-cyber-blue/25"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isLoading}
                      className="px-3 py-2 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyber-blue/25 transition-all duration-300"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
