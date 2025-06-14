import { GitHubStats, APIResponse } from '@/types/chatbot';

class GitHubService {
  private baseUrl = 'https://api.github.com';
  private token = import.meta.env.VITE_GITHUB_TOKEN;
  private username = import.meta.env.VITE_GITHUB_USERNAME;

  private async makeRequest<T>(endpoint: string): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Chatbot'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
        rateLimitRemaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0')
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getRepositoryStats(repoName: string): Promise<APIResponse<GitHubStats>> {
    try {
      const [repoResponse, languagesResponse, commitsResponse] = await Promise.all([
        this.makeRequest(`/repos/${this.username}/${repoName}`),
        this.makeRequest(`/repos/${this.username}/${repoName}/languages`),
        this.makeRequest(`/repos/${this.username}/${repoName}/commits?per_page=1`)
      ]);

      if (!repoResponse.success || !languagesResponse.success) {
        throw new Error('Failed to fetch repository data');
      }

      const repo = repoResponse.data;
      const languages = languagesResponse.data;

      // Get commit count from Link header
      const commitCount = await this.getCommitCount(repoName);

      const stats: GitHubStats = {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        commits: commitCount,
        contributors: await this.getContributorCount(repoName),
        languages: languages,
        lastUpdated: repo.updated_at,
        issues: repo.open_issues_count,
        pullRequests: await this.getPullRequestCount(repoName)
      };

      return { success: true, data: stats };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch repository stats'
      };
    }
  }

  async getRepositoryReadme(repoName: string): Promise<APIResponse<string>> {
    try {
      const response = await this.makeRequest(`/repos/${this.username}/${repoName}/readme`);
      
      if (!response.success) {
        return { success: false, error: 'README not found' };
      }

      // Decode base64 content
      const content = atob(response.data.content.replace(/\n/g, ''));
      return { success: true, data: content };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch README'
      };
    }
  }

  private async getCommitCount(repoName: string): Promise<number> {
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.username}/${repoName}/commits?per_page=1`,
        {
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      const linkHeader = response.headers.get('Link');
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (match) {
          return parseInt(match[1]);
        }
      }

      // Fallback: count commits manually (less accurate for large repos)
      const commits = await response.json();
      return commits.length;
    } catch {
      return 0;
    }
  }

  private async getContributorCount(repoName: string): Promise<number> {
    try {
      const response = await this.makeRequest(`/repos/${this.username}/${repoName}/contributors`);
      return response.success ? response.data.length : 0;
    } catch {
      return 0;
    }
  }

  private async getPullRequestCount(repoName: string): Promise<number> {
    try {
      const response = await this.makeRequest(`/repos/${this.username}/${repoName}/pulls?state=all&per_page=1`);
      
      if (!response.success) return 0;

      // For pull requests, we'll use a simpler approach
      const data = response.data;
      return Array.isArray(data) ? data.length : 0;

      return 0;
    } catch {
      return 0;
    }
  }

  async getAllRepositoriesData(): Promise<APIResponse<Record<string, GitHubStats>>> {
    const repos = import.meta.env.VITE_GITHUB_REPOS?.split(',') || [];
    const results: Record<string, GitHubStats> = {};

    try {
      const promises = repos.map(async (repo) => {
        const stats = await this.getRepositoryStats(repo.trim());
        if (stats.success && stats.data) {
          results[repo.trim()] = stats.data;
        }
      });

      await Promise.all(promises);

      return { success: true, data: results };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch repositories data'
      };
    }
  }

  async searchRepositoryContent(repoName: string, query: string): Promise<APIResponse<any[]>> {
    try {
      const response = await this.makeRequest(
        `/search/code?q=${encodeURIComponent(query)}+repo:${this.username}/${repoName}`
      );

      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search repository content'
      };
    }
  }
}

export const githubService = new GitHubService();
