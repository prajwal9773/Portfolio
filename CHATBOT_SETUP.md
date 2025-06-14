# 🤖 AI Chatbot Setup Guide

## Overview
This portfolio features an advanced AI chatbot powered by Groq AI with GitHub API integration, providing intelligent responses about Dhruba's projects, skills, and experience.

## 🔧 Setup Instructions

### 1. Environment Variables
Copy the `.env.local` file and add your API keys:

```bash
# Required API Keys
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

### 2. Get Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up/Login with your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

### 3. Get GitHub Personal Access Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `public_repo` (for public repository access)
   - `read:user` (for user information)
4. Copy the token to your `.env.local` file

### 4. Configuration
The chatbot is pre-configured with:
- **Model**: `llama3-8b-8192` (fast and efficient with 8K context window)
- **Temperature**: 0.7 (balanced creativity/accuracy)
- **Context**: Full project knowledge from READMEs
- **GitHub Integration**: Live repository statistics

## 🎯 Features

### Core Capabilities
- **Project Knowledge**: Detailed information about all projects
- **GitHub Integration**: Live stats, commits, languages, contributors
- **Context Awareness**: Understands conversation flow and intent
- **Smart Responses**: Technical, business, or career-focused answers
- **Suggested Questions**: Guides users to relevant topics

### Conversation Types
1. **Technical**: Architecture, code quality, implementation details
2. **Business**: ROI, impact, problem-solving approach
3. **Career**: Skills, experience, hiring information
4. **General**: Development philosophy, AI methodology

### Project Context
The chatbot has deep knowledge of:
- **Event Manager** (75k+ lines): Architecture, features, impact
- **GitIQ** (40k+ lines): AI integration, performance metrics
- **Portfolio** (15k+ lines): Design decisions, development process

## 🚀 Usage

### For Visitors
- Click the floating chat button (bottom-right)
- Ask about projects, skills, or experience
- Use suggested questions for guided exploration
- Get instant, detailed responses

### Sample Questions
- "Tell me about Dhruba's major projects"
- "How does AI orchestration work?"
- "What's the architecture of GitIQ?"
- "How can I hire Dhruba?"
- "What technologies does he specialize in?"

## 🔒 Security & Privacy

### Rate Limiting
- 50 requests per hour per user
- Automatic throttling for API protection
- Graceful degradation on limits

### Data Handling
- No conversation storage
- No personal data collection
- API keys secured in environment variables
- GitHub token with minimal required permissions

## 🛠️ Technical Architecture

### Services
- **GroqService**: AI response generation
- **GitHubService**: Repository data fetching
- **ContextService**: Project knowledge management

### Components
- **Chatbot**: Main UI component
- **useChatbot**: React hook for state management
- **Message handling**: Real-time conversation flow

### Performance
- **Caching**: 30-minute cache for GitHub data
- **Lazy loading**: Components load on demand
- **Optimized requests**: Minimal API calls
- **Fast responses**: ~1-2 second response time

## 🎨 UI/UX Features

### Design
- **Cyber theme**: Matches portfolio aesthetic
- **Glassmorphism**: Modern, professional appearance
- **Animations**: Smooth transitions and interactions
- **Responsive**: Works on all device sizes

### Interactions
- **Typing indicators**: Shows AI is processing
- **Suggested questions**: Guides conversation
- **Message formatting**: Rich text with code highlighting
- **Quick actions**: One-click question sending

## 📊 Analytics & Monitoring

### Metrics Tracked
- Response times
- User engagement
- Popular questions
- Error rates

### Error Handling
- Graceful API failures
- Fallback responses
- User-friendly error messages
- Automatic retry logic

## 🔄 Maintenance

### Regular Updates
- Project information sync
- GitHub statistics refresh
- Performance optimization
- Feature enhancements

### Monitoring
- API usage tracking
- Response quality assessment
- User feedback integration
- Performance metrics

## 🎯 Business Impact

### For Portfolio
- **Differentiation**: Unique interactive feature
- **Engagement**: Keeps visitors longer
- **Information**: Provides detailed project insights
- **Professional**: Demonstrates AI integration skills

### For Visitors
- **Instant answers**: No waiting for responses
- **Detailed insights**: Deep project knowledge
- **Interactive experience**: Engaging conversation
- **Professional contact**: Direct communication channel

---

**Note**: This chatbot represents the cutting-edge of AI-human collaboration, showcasing Dhruba's expertise in AI orchestration and integration. It's not just a feature—it's a demonstration of what's possible when strategic AI collaboration meets creative vision.
