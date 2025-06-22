import { ChatMessage, ChatbotResponse, ConversationContext, APIResponse } from '@/types/chatbot';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class GroqService {
  private apiKey = import.meta.env.VITE_GROQ_API_KEY;
  private baseUrl = 'https://api.groq.com/openai/v1';
  private model = import.meta.env.VITE_CHATBOT_MODEL || 'llama3-8b-8192'; // Fast and efficient model with 8K context

  private getSystemPrompt(context: ConversationContext): string {
    const ownerName = import.meta.env.VITE_OWNER_NAME || 'prajwal Kumar';
    const ownerTitle = import.meta.env.VITE_OWNER_TITLE || 'Full-Stack Developer';
    
    return `You are ${ownerName}'s AI assistant, representing a ${ownerTitle} from IIIT Sricity. 

PERSONALITY & TONE:
- Professional yet approachable
- Concise and to-the-point
- Enthusiastic about AI-driven development
- Confident but not arrogant
- Always helpful and informative

RESPONSE STYLE:
- Keep responses SHORT and CONCISE (2-3 sentences max for simple questions)
- Only provide detailed explanations when specifically asked for details
- Use bullet points for lists to save space
- Avoid repetitive information
- Get straight to the point

CORE KNOWLEDGE:
${ownerName} is an AI-Orchestrated Full-Stack Developer and 3rd year Computer Science Engineering student at IIIT Sricity. He specializes in AI collaboration, and building large-scale applications, efficient and scalable development.

MAJOR PROJECTS:
1. Task Manager (75k lines) - Task management platform, 70% faster registration, React/Node.js/Express/Redis/Docker/CI CD/Mongo DB
2. Bartalap  - Chattting and communication platfrom, Designed for conversation with friends, multi-AI integration
3. Portfolio (15k lines) - This website, cyberpunk design, React/TypeScript

DEVELOPMENT PHILOSOPHY:
- Proves that System Design can help in building production-scale complexity
- Continuous learning from setbacks and improvements
- Goal: Bridge AI/ML with web development

CONTACT INFO:
- Email: prajwalkum03airs@gmail.com
- Phone: +91 7004990508
- GitHub: https://github.com/prajwal9773
- LinkedIn: https://www.linkedin.com/in/prajwal-kumar-b2798b24a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
- Location: IIIT Sricity, Chittor, India

RESPONSE GUIDELINES:
- Keep answers SHORT (1-3 sentences for basic questions)
- Only elaborate when asked for "details" or "more information"
- Use bullet points for lists
- Include relevant project examples briefly
- Offer to elaborate: "Want more details about [topic]?"
- For simple questions like "Who is prajwal?", give a 1-2 sentence answer
- Save detailed explanations for when specifically requested
- ONLY answer questions about prajwal, his projects, skills, or work-related topics
- If asked about unrelated topics, politely redirect to prajwal-related questions

EXAMPLE RESPONSES:
Q: "Who is prajwal?"
A: "Prajwal is an Full-Stack Developer and 3rd year Computer Science Engineering student at IIIT Sricity. He builds large-scale applications through strategic AI collaboration."

Q: "What are his projects?"
A: "• Task Manager (75k lines) - Event platform, 70% faster registration
• Bartalap (40k lines) - Chatting and communication platfrom
• Portfolio (15k lines) - This website"

Current conversation context: ${JSON.stringify(context)}

Remember: Keep responses SHORT unless asked for details. You represent ${ownerName} professionally.`;
  }

  private isOffTopic(query: string): boolean {
    const lowerQuery = query.toLowerCase();

    // Topics related to Dhruba and his work
    const relevantKeywords = [
      'prajwal', 'project', 'Task manager', 'Bartalap', 'portfolio', 'website',
      'ai', 'development', 'developer', 'programming', 'code', 'technology',
      'IIIT Sricity', 'computer Science', 'student', 'experience', 'skill',
      'hire', 'contact', 'email', 'phone', 'collaboration', 'work',
      'react', 'node', 'typescript', 'javascript', 'Express', 'github',
      'orchestration', 'MongoDb', 'full stack', 'web development', 'PostgresSql',
      'Redis', 'Docker', 'Devops', 'Clerk'
    ];

    // Check if query contains any relevant keywords
    const hasRelevantKeywords = relevantKeywords.some(keyword =>
      lowerQuery.includes(keyword)
    );

    // Off-topic indicators
    const offTopicKeywords = [
      'weather', 'sports', 'politics', 'news', 'cooking', 'recipe',
      'movie', 'music', 'celebrity', 'game', 'joke', 'story',
      'math problem', 'homework', 'assignment', 'translate',
      'what is', 'how to', 'explain', 'define'
    ];

    const hasOffTopicKeywords = offTopicKeywords.some(keyword =>
      lowerQuery.includes(keyword)
    );

    // If it has off-topic keywords and no relevant keywords, it's off-topic
    if (hasOffTopicKeywords && !hasRelevantKeywords) {
      return true;
    }

    // If it's a very general question without context about Dhruba
    const generalQuestions = [
      'hello', 'hi', 'hey', 'good morning', 'good evening',
      'how are you', 'what can you do', 'help me'
    ];

    const isGeneralGreeting = generalQuestions.some(greeting =>
      lowerQuery.includes(greeting)
    );

    // Allow greetings and questions with relevant keywords
    return !isGeneralGreeting && !hasRelevantKeywords && lowerQuery.length > 10;
  }

  async generateResponse(
    messages: ChatMessage[],
    context: ConversationContext,
    additionalContext?: string
  ): Promise<APIResponse<ChatbotResponse>> {
    try {
      // Check if the last user message is off-topic
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage && this.isOffTopic(lastUserMessage.content)) {
        return {
          success: true,
          data: {
            message: "I'm here to help you learn about prajwal's projects, skills, and experience. Please ask me anything related to his work, development approach, or how to get in touch with him!",
            suggestedQuestions: [
              "Tell me about prajwal's projects",
              "What technologies does he use?",
              "How does AI orchestration work?",
              "How can I contact prajwal?"
            ]
          }
        };
      }

      const systemPrompt = this.getSystemPrompt(context);
      
      // Add additional context if provided (GitHub data, README content, etc.)
      const enhancedSystemPrompt = additionalContext 
        ? `${systemPrompt}\n\nADDITIONAL CONTEXT:\n${additionalContext}`
        : systemPrompt;

      const groqMessages: GroqMessage[] = [
        { role: 'system', content: enhancedSystemPrompt },
        ...messages.slice(-10).map(msg => ({ // Keep last 10 messages for context
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }))
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          messages: groqMessages,
          temperature: parseFloat(import.meta.env.VITE_RESPONSE_TEMPERATURE || '0.7'),
          max_tokens: 300, // Reduced for shorter responses
          top_p: 0.9,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data: GroqResponse = await response.json();
      const assistantMessage = data.choices[0]?.message?.content;

      if (!assistantMessage) {
        throw new Error('No response from AI');
      }

      // Parse response for enhanced features
      const chatbotResponse = this.parseResponse(assistantMessage, context);

      return {
        success: true,
        data: {
          ...chatbotResponse,
          message: assistantMessage
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate response'
      };
    }
  }

  private parseResponse(message: string, context: ConversationContext): Partial<ChatbotResponse> {
    const response: Partial<ChatbotResponse> = {};

    // Extract suggested questions (if AI includes them)
    const questionMatch = message.match(/SUGGESTED_QUESTIONS:\s*(.*?)(?:\n|$)/);
    if (questionMatch) {
      response.suggestedQuestions = questionMatch[1].split(',').map(q => q.trim());
    }

    // Extract project references
    const projectKeywords = ['Task manager', 'Bartalap', 'portfolio', 'IIIT Sricity'];
    response.projectReferences = projectKeywords.filter(keyword => 
      message.toLowerCase().includes(keyword)
    );

    // Extract code snippets (if any)
    const codeBlocks = message.match(/```(\w+)?\n([\s\S]*?)```/g);
    if (codeBlocks) {
      response.codeSnippets = codeBlocks.map(block => {
        const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
        return {
          language: match?.[1] || 'text',
          code: match?.[2] || '',
          description: 'Code example'
        };
      });
    }

    // Extract links
    const linkMatches = message.match(/\[([^\]]+)\]\(([^)]+)\)/g);
    if (linkMatches) {
      response.links = linkMatches.map(link => {
        const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
        const url = match?.[2] || '';
        return {
          text: match?.[1] || '',
          url,
          type: url.includes('github.com') ? 'github' as const : 
                url.includes('vercel.app') || url.includes('demo') ? 'demo' as const : 
                'external' as const
        };
      });
    }

    return response;
  }

  async analyzeUserIntent(message: string): Promise<ConversationContext['userIntent']> {
    const technicalKeywords = ['code', 'architecture', 'technical', 'implementation', 'api', 'database', 'algorithm'];
    const businessKeywords = ['roi', 'impact', 'business', 'client', 'project management', 'timeline', 'cost'];
    const careerKeywords = ['experience', 'skills', 'background', 'education', 'career', 'hire', 'job'];
    const contactKeywords = ['contact', 'email', 'phone', 'reach', 'connect', 'hire', 'collaborate'];

    const lowerMessage = message.toLowerCase();

    if (contactKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'contact';
    }
    if (technicalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'technical';
    }
    if (businessKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'business';
    }
    if (careerKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'career';
    }

    return 'general';
  }
}

export const groqService = new GroqService();
