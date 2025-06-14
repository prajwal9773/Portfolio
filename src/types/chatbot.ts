export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  metadata?: {
    projectContext?: string;
    githubData?: any;
    responseTime?: number;
    tokens?: number;
  };
}

export interface ProjectContext {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  lines: number;
  githubUrl: string;
  demoUrl?: string;
  readme?: string;
  stats?: GitHubStats;
  highlights: string[];
}

export interface GitHubStats {
  stars: number;
  forks: number;
  commits: number;
  contributors: number;
  languages: Record<string, number>;
  lastUpdated: string;
  issues: number;
  pullRequests: number;
}

export interface ChatbotConfig {
  name: string;
  personality: 'professional' | 'casual' | 'technical' | 'professional_technical';
  maxContextLength: number;
  temperature: number;
  systemPrompt: string;
}

export interface ConversationContext {
  currentProject?: string;
  userIntent: 'technical' | 'business' | 'career' | 'general' | 'contact';
  previousQuestions: string[];
  userProfile?: {
    isRecruiter?: boolean;
    isDeveloper?: boolean;
    isClient?: boolean;
    interests?: string[];
  };
}

export interface ChatbotResponse {
  message: string;
  suggestedQuestions?: string[];
  projectReferences?: string[];
  codeSnippets?: {
    language: string;
    code: string;
    description: string;
  }[];
  links?: {
    text: string;
    url: string;
    type: 'github' | 'demo' | 'external';
  }[];
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  rateLimitRemaining?: number;
}

export interface ChatbotState {
  isOpen: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  context: ConversationContext;
  isTyping: boolean;
  error?: string;
}

export type QuestionCategory = 
  | 'project_overview'
  | 'technical_details'
  | 'business_impact'
  | 'development_process'
  | 'ai_methodology'
  | 'career_info'
  | 'contact_info'
  | 'general';

export interface QuestionIntent {
  category: QuestionCategory;
  confidence: number;
  keywords: string[];
  requiresGitHubData: boolean;
  requiresProjectContext: boolean;
}
