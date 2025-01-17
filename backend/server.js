const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Enhanced fake data with richer content
const articles = [
  {
    id: 1,
    title: "Complete Guide to Modern React Development in 2024",
    content: `React continues to evolve as the leading JavaScript library for building user interfaces. 
    In this comprehensive guide, we'll explore the latest features including React Server Components, 
    Suspense for Data Fetching, and the new React hooks. Learn how to build performant, 
    scalable applications using modern React practices and patterns.
    
    Key topics covered:
    • Understanding React 18's concurrent features
    • Working with Server Components
    • Advanced state management techniques
    • Performance optimization strategies`,
    author: "Sarah Johnson",
    authorRole: "Senior Frontend Engineer at TechCorp",
    date: "2024-03-15",
    imageUrl: "https://picsum.photos/800/400",
    category: "React",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    relatedLinks: [
      { title: "React Documentation", url: "https://react.dev" },
      { title: "React GitHub", url: "https://github.com/facebook/react" }
    ]
  },
  {
    id: 2,
    title: "Node.js Microservices Architecture: A Production-Ready Approach",
    content: `Microservices architecture has become the standard for building scalable backend systems. 
    This article deep dives into implementing microservices using Node.js, exploring patterns, 
    best practices, and real-world examples.
    
    We'll cover:
    • Service discovery and registration
    • Inter-service communication
    • Database patterns for microservices
    • Monitoring and logging strategies
    • Deployment considerations`,
    author: "Michael Chen",
    authorRole: "Cloud Architecture Consultant",
    date: "2024-03-14",
    imageUrl: "https://picsum.photos/800/401",
    category: "Backend",
    readTime: "12 min read",
    tags: ["Node.js", "Microservices", "Backend", "Architecture"],
    relatedLinks: [
      { title: "Node.js Best Practices", url: "https://nodejs.org/en/docs/guides" },
      { title: "Microservices.io", url: "https://microservices.io" }
    ]
  },
  {
    id: 3,
    title: "AI-Driven Development: Integrating ChatGPT in Modern Applications",
    content: `Artificial Intelligence is revolutionizing how we develop software. 
    Learn how to leverage ChatGPT and other AI tools to enhance your development workflow, 
    improve code quality, and accelerate project delivery.
    
    Topics covered:
    • AI-assisted code generation
    • Automated code review
    • Natural language processing in apps
    • Best practices for AI integration`,
    author: "Dr. Emily Rodriguez",
    authorRole: "AI Research Lead",
    date: "2024-03-13",
    imageUrl: "https://picsum.photos/800/402",
    category: "AI",
    readTime: "10 min read",
    tags: ["AI", "ChatGPT", "Machine Learning", "Development"],
    relatedLinks: [
      { title: "OpenAI Documentation", url: "https://openai.com/docs" },
      { title: "AI Development Guide", url: "https://ai-patterns.dev" }
    ]
  }
];

// Enhanced monitoring middleware to show more detailed IP information
app.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress;
  const forwardedFor = req.headers['x-forwarded-for'];
  const timestamp = new Date().toISOString();

  console.log('=== Request Details ===');
  console.log(`Time: ${timestamp}`);
  console.log(`Direct IP: ${ip}`);
  console.log(`Forwarded IP: ${forwardedFor || 'None'}`);
  console.log(`IP Type: ${ip === '::1' ? 'localhost (IPv6)' : 
               ip === '127.0.0.1' ? 'localhost (IPv4)' : 
               ip.startsWith('::ffff:') ? 'IPv4 mapped to IPv6' : 
               'Remote IP'}`);
  console.log('====================\n');

  next();
});

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// New endpoint for article categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(articles.map(article => article.category))];
  res.json(categories);
});

// New endpoint for article tags
app.get('/api/tags', (req, res) => {
  const tags = [...new Set(articles.flatMap(article => article.tags))];
  res.json(tags);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});