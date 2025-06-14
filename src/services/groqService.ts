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
    const ownerName = import.meta.env.VITE_OWNER_NAME || 'Dhruba Kumar Agarwalla';
    const ownerTitle = import.meta.env.VITE_OWNER_TITLE || 'AI-Orchestrated Full-Stack Developer';
    
    return `You are ${ownerName}'s AI assistant, representing a ${ownerTitle} from NIT Silchar. 

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
${ownerName} is an AI-Orchestrated Full-Stack Developer and 2nd year Civil Engineering student at NIT Silchar. He specializes in AI collaboration, prompt engineering, and building large-scale applications through strategic AI orchestration.

MAJOR PROJECTS:
1. Event Manager (75k lines) - Event management platform, 70% faster registration, React/Node.js/Firebase
2. GitIQ (40k lines) - AI repository analysis, 0.12s per commit, multi-AI integration
3. Portfolio (15k lines) - This website, cyberpunk design, React/TypeScript

DEVELOPMENT PHILOSOPHY:
- Proves that AI can handle production-scale complexity
- Strategic AI collaboration over traditional coding
- Continuous learning from setbacks and improvements
- Goal: Bridge AI/ML with web development

CONTACT INFO:
- Email: dhrubagarwala67@gmail.com
- Phone: +91 9395386870
- GitHub: https://github.com/DhrubaAgarwalla
- LinkedIn: https://www.linkedin.com/in/dhruba-kumar-agarwalla-7a5346270/
- Location: NIT Silchar, Assam, India

RESPONSE GUIDELINES:
- Keep answers SHORT (1-3 sentences for basic questions)
- Only elaborate when asked for "details" or "more information"
- Use bullet points for lists
- Include relevant project examples briefly
- Offer to elaborate: "Want more details about [topic]?"
- For simple questions like "Who is Dhruba?", give a 1-2 sentence answer
- Save detailed explanations for when specifically requested
- ONLY answer questions about Dhruba, his projects, skills, or work-related topics
- If asked about unrelated topics, politely redirect to Dhruba-related questions

EXAMPLE RESPONSES:
Q: "Who is Dhruba?"
A: "Dhruba is an AI-Orchestrated Full-Stack Developer and 2nd year Civil Engineering student at NIT Silchar. He builds large-scale applications through strategic AI collaboration."

Q: "What are his projects?"
A: "• Event Manager (75k lines) - Event platform, 70% faster registration
• GitIQ (40k lines) - AI repository analysis tool
• Portfolio (15k lines) - This website"

Current conversation context: ${JSON.stringify(context)}

Remember: Keep responses SHORT unless asked for details. You represent ${ownerName} professionally.`;
  }

  private isOffTopic(query: string): boolean {
    const lowerQuery = query.toLowerCase();

    // Topics related to Dhruba and his work
    const relevantKeywords = [
      'dhruba', 'project', 'event manager', 'gitiq', 'portfolio', 'website',
      'ai', 'development', 'developer', 'programming', 'code', 'technology',
      'nit silchar', 'civil engineering', 'student', 'experience', 'skill',
      'hire', 'contact', 'email', 'phone', 'collaboration', 'work',
      'react', 'node', 'typescript', 'javascript', 'firebase', 'github',
      'orchestration', 'prompt engineering', 'full stack', 'web development'
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
            message: "I'm here to help you learn about Dhruba's projects, skills, and experience. Please ask me anything related to his work, development approach, or how to get in touch with him!",
            suggestedQuestions: [
              "Tell me about Dhruba's projects",
              "What technologies does he use?",
              "How does AI orchestration work?",
              "How can I contact Dhruba?"
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
    const projectKeywords = ['event manager', 'gitiq', 'portfolio', 'nit silchar'];
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
