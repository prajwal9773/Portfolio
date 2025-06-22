import { ProjectContext, ConversationContext, APIResponse } from '@/types/chatbot';
import { githubService } from './githubService';

class ContextService {
  private projectsCache: Map<string, ProjectContext> = new Map();
  private readmeCache: Map<string, string> = new Map();
  private lastCacheUpdate: Date | null = null;
  private cacheExpiry = 30 * 60 * 1000; // 30 minutes

  private projectsData: Record<string, Partial<ProjectContext>> = {
    'Planity': {
      id: 'task-manager',
      name: 'Collaborative Task Management Platform',
      description: 'A full-featured project management tool inspired by Trello and Jira with real-time collaboration',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'JWT', 'Socket.io', 'Docker', 'Tailwind CSS'],
      lines: 30000,  // Estimated based on project scope
      githubUrl: 'https://github.com/prajwal9773/FDFSD',
      demoUrl: 'https://planity-1.onrender.com/',
      highlights: [
        'Drag-and-drop task cards with real-time updates',
        'Role-based access control and full user authentication',
        'Board-based organization similar to Trello/Jira',
        'MongoDB + Redis powered backend with Docker containerization',
        'Socket.io-based real-time collaboration features',
        'Responsive UI with Tailwind CSS and custom modals/forms'
      ]
    },
    'ChartSync': {
      id: 'chartsync',
      name: 'ChartSync - Real-Time Chat & Collaboration Platform',
      description: 'Real-time collaborative chatting and charting system using Socket.io and WebSockets',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'WebSockets', 'Cloudinary', 'DaisyUI'],
      lines: 25000,  // Estimated
      githubUrl: 'https://github.com/prajwal9773/ChartSync',
      demoUrl: '',  // You can update with the actual deployed link if available
      highlights: [
        'Real-time bi-directional communication using Socket.io',
        'Collaborative chart editing with persistent state',
        'Low-latency WebSocket-based architecture for seamless UX',
        'Cloudinary integration for optimized media handling',
        'Scalable MongoDB-based backend with efficient query performance',
        'Modular and responsive UI built with React.js and DaisyUI',
        'Supports multi-user sessions and collaborative workflows'
      ]
    },
    'stellar-code-lab': {
      id: 'portfolio-website',
      name: 'AI-Orchestrated Portfolio',
      description: 'This revolutionary portfolio website showcasing the future of AI-driven development',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'shadcn/ui'],
      lines: 15000,  // Estimated based on typical modern portfolio structure
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
  }
  ;

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
      'Project Management': 'Trello, jira',
      'SIH': 'National Hackathon',
      'Bartalap': 'Chatting',
      'Chatting': 'Bartalap',
      'Communicate': 'Chattting',
      'Task management': 'Jira like worknest',
      ' portfolio website': 'Personal Website'
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
        "Tell me about the project Manager project",
        "What's special about Hackathon?",
        "How was this portfolio website built?",
        "What is Bartalap project"
      );
    }

    if (lowerQuery.includes('technical') || lowerQuery.includes('code')) {
      suggestions.push(
        "What technologies does prajwal use?",
        "How does the AI orchestration work?",
        "Show me the architecture of Bartalap"
      );
    }

    if (lowerQuery.includes('ai') || lowerQuery.includes('artificial intelligence')) {
      suggestions.push(
        "How does prajwal collaborate with AI?",
        "What's the AI development methodology?",
        "Which AI providers are used in projects?"
      );
    }

    return suggestions.slice(0, 3);
  }
}

export const contextService = new ContextService();
