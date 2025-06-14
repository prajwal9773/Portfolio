import { ProjectContext, ConversationContext, APIResponse } from '@/types/chatbot';
import { githubService } from './githubService';

class ContextService {
  private projectsCache: Map<string, ProjectContext> = new Map();
  private readmeCache: Map<string, string> = new Map();
  private lastCacheUpdate: Date | null = null;
  private cacheExpiry = 30 * 60 * 1000; // 30 minutes

  private projectsData: Record<string, Partial<ProjectContext>> = {
    'NITS-Event-Managment': {
      id: 'event-manager',
      name: 'NIT Silchar Event Manager',
      description: '75,000+ lines of AI-orchestrated code creating a comprehensive event management platform',
      technologies: ['React', 'Node.js', 'Firebase', 'Google Sheets API', 'Recharts', 'Cloudinary', 'QR Code System'],
      lines: 75000,
      githubUrl: 'https://github.com/DhrubaAgarwalla/NITS-Event-Managment',
      demoUrl: 'https://nits-event-managment.vercel.app/',
      highlights: [
        '75,000+ lines of AI-orchestrated code',
        'Reduced event registration time by 70%',
        'Real-time QR code attendance system with email automation',
        'Google Sheets integration with automated data pipeline',
        'Role-based access control (Admin, Club, Participant)',
        'Built in 3-4 weeks with $0 budget through AI collaboration'
      ]
    },
    'GitIQ': {
      id: 'gitiq',
      name: 'GitIQ - AI Repository Insights',
      description: '40,000+ lines of intelligent GitHub analysis tool with multi-AI provider integration',
      technologies: ['Next.js 14', 'TypeScript', 'Groq AI', 'Google Gemini', 'HuggingFace', 'Recharts', 'GitHub API'],
      lines: 40000,
      githubUrl: 'https://github.com/DhrubaAgarwalla/GitIQ',
      demoUrl: 'https://git-iq.vercel.app/',
      highlights: [
        '40,000+ lines built in less than a week',
        'Multi-AI provider integration (Groq, Gemini, HuggingFace)',
        'Ultra-fast processing: 0.12s per commit analysis',
        'Advanced commit categorization and pattern recognition',
        'Real-time repository health scoring',
        'Over-delivered: Created enterprise-level tool for club project'
      ]
    },
    'stellar-code-lab': {
      id: 'portfolio-website',
      name: 'AI-Orchestrated Portfolio',
      description: 'This revolutionary portfolio website showcasing the future of AI-driven development',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'shadcn/ui'],
      lines: 15000,
      githubUrl: 'https://github.com/DhrubaAgarwalla/stellar-code-lab',
      demoUrl: 'https://portfolio-dhruba.vercel.app/',
      highlights: [
        'Meta-project: Portfolio showcasing AI-orchestrated development',
        'Advanced cyberpunk design with glassmorphism effects',
        'Comprehensive sections: Hero, Projects, About, Tech Stack, Contact',
        'Enhanced 3D card effects and smooth animations',
        'Mobile-responsive with professional loading screen',
        'Built through strategic AI collaboration and prompt engineering'
      ]
    }
  };

  async getProjectContext(projectId: string): Promise<APIResponse<ProjectContext>> {
    try {
      // Check cache first
      if (this.projectsCache.has(projectId) && this.isCacheValid()) {
        return { success: true, data: this.projectsCache.get(projectId)! };
      }

      // Find project data
      const repoName = this.getRepoNameFromId(projectId);
      const projectData = this.projectsData[repoName];

      if (!projectData) {
        return { success: false, error: 'Project not found' };
      }

      // Fetch GitHub stats and README
      const [statsResponse, readmeResponse] = await Promise.all([
        githubService.getRepositoryStats(repoName),
        this.getProjectReadme(repoName)
      ]);

      const projectContext: ProjectContext = {
        ...projectData,
        stats: statsResponse.success ? statsResponse.data : undefined,
        readme: readmeResponse.success ? readmeResponse.data : undefined
      } as ProjectContext;

      // Cache the result
      this.projectsCache.set(projectId, projectContext);
      this.lastCacheUpdate = new Date();

      return { success: true, data: projectContext };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get project context'
      };
    }
  }

  async getAllProjectsContext(): Promise<APIResponse<ProjectContext[]>> {
    try {
      const projectIds = Object.keys(this.projectsData);
      const promises = projectIds.map(repoName => {
        const projectId = this.projectsData[repoName].id!;
        return this.getProjectContext(projectId);
      });

      const results = await Promise.all(promises);
      const projects = results
        .filter(result => result.success)
        .map(result => result.data!);

      return { success: true, data: projects };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get all projects context'
      };
    }
  }

  async getProjectReadme(repoName: string): Promise<APIResponse<string>> {
    // Check cache first
    if (this.readmeCache.has(repoName) && this.isCacheValid()) {
      return { success: true, data: this.readmeCache.get(repoName)! };
    }

    const response = await githubService.getRepositoryReadme(repoName);
    
    if (response.success && response.data) {
      this.readmeCache.set(repoName, response.data);
    }

    return response;
  }

  async buildContextForQuery(query: string, context: ConversationContext): Promise<string> {
    let contextString = '';

    // Detect if query is about specific project
    const projectKeywords = {
      'event manager': 'NITS-Event-Managment',
      'nit silchar': 'NITS-Event-Managment',
      'gitiq': 'GitIQ',
      'git iq': 'GitIQ',
      'repository insights': 'GitIQ',
      'portfolio': 'stellar-code-lab',
      'website': 'stellar-code-lab'
    };

    const lowerQuery = query.toLowerCase();
    let relevantProject: string | null = null;

    for (const [keyword, repoName] of Object.entries(projectKeywords)) {
      if (lowerQuery.includes(keyword)) {
        relevantProject = repoName;
        break;
      }
    }

    // If specific project mentioned, get detailed context
    if (relevantProject) {
      const projectData = this.projectsData[relevantProject];
      const projectId = projectData.id!;
      const projectContext = await this.getProjectContext(projectId);

      if (projectContext.success) {
        const project = projectContext.data;
        contextString += `\nDETAILED PROJECT CONTEXT for ${project.name}:\n`;
        contextString += `- Description: ${project.description}\n`;
        contextString += `- Technologies: ${project.technologies.join(', ')}\n`;
        contextString += `- Lines of Code: ${project.lines.toLocaleString()}\n`;
        contextString += `- GitHub: ${project.githubUrl}\n`;
        if (project.demoUrl) contextString += `- Demo: ${project.demoUrl}\n`;
        
        if (project.stats) {
          contextString += `- GitHub Stats: ${project.stats.stars} stars, ${project.stats.forks} forks, ${project.stats.commits} commits\n`;
          contextString += `- Languages: ${Object.keys(project.stats.languages).join(', ')}\n`;
        }

        contextString += `- Key Highlights:\n${project.highlights.map(h => `  • ${h}`).join('\n')}\n`;

        if (project.readme) {
          contextString += `\nREADME CONTENT:\n${project.readme.substring(0, 2000)}...\n`;
        }
      }
    } else {
      // General context - provide overview of all projects
      const allProjects = await this.getAllProjectsContext();
      if (allProjects.success) {
        contextString += '\nALL PROJECTS OVERVIEW:\n';
        allProjects.data.forEach(project => {
          contextString += `\n${project.name}:\n`;
          contextString += `- ${project.description}\n`;
          contextString += `- ${project.lines.toLocaleString()} lines of code\n`;
          contextString += `- Tech: ${project.technologies.slice(0, 3).join(', ')}\n`;
        });
      }
    }

    return contextString;
  }

  private getRepoNameFromId(projectId: string): string {
    for (const [repoName, data] of Object.entries(this.projectsData)) {
      if (data.id === projectId) {
        return repoName;
      }
    }
    throw new Error(`Repository not found for project ID: ${projectId}`);
  }

  private isCacheValid(): boolean {
    if (!this.lastCacheUpdate) return false;
    return Date.now() - this.lastCacheUpdate.getTime() < this.cacheExpiry;
  }

  clearCache(): void {
    this.projectsCache.clear();
    this.readmeCache.clear();
    this.lastCacheUpdate = null;
  }

  getProjectSuggestions(query: string): string[] {
    const suggestions: string[] = [];
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
      suggestions.push(
        "Tell me about the Event Manager project",
        "What's special about GitIQ?",
        "How was this portfolio website built?"
      );
    }

    if (lowerQuery.includes('technical') || lowerQuery.includes('code')) {
      suggestions.push(
        "What technologies does Dhruba use?",
        "How does the AI orchestration work?",
        "Show me the architecture of GitIQ"
      );
    }

    if (lowerQuery.includes('ai') || lowerQuery.includes('artificial intelligence')) {
      suggestions.push(
        "How does Dhruba collaborate with AI?",
        "What's the AI development methodology?",
        "Which AI providers are used in projects?"
      );
    }

    return suggestions.slice(0, 3);
  }
}

export const contextService = new ContextService();
