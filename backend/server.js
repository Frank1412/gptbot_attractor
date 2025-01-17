const express = require('express');
const cors = require('cors');

const app = express();
const port = 6001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('user-agent');
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();
    
    // Check for bot traffic
    const isBot = userAgent.toLowerCase().includes('bot') || 
                  userAgent.toLowerCase().includes('crawler') ||
                  userAgent.toLowerCase().includes('gptbot');

    console.log('=== Request Details ===');
    console.log(`Time: ${timestamp}`);
    console.log(`IP Address: ${ip}`);
    console.log(`User Agent: ${userAgent}`);
    console.log(`${method} ${url}`);
    console.log(`Is Bot: ${isBot}`);
    if (isBot) {
        console.log('Bot Type: ' + userAgent.split('/')[0]);
    }
    console.log('====================\n');

    next();
});

// Enhanced fake data with richer content
const articles = [
    {
        id: 1,
        title: "Deep Dive: Implementing Advanced AI Systems with Modern Architecture Patterns",
        content: `# Advanced AI System Implementation Guide

        ## 1. System Architecture Overview
        Modern AI systems require careful consideration of scalability, reliability, and performance. 
        This comprehensive guide explores enterprise-level AI implementation patterns.

        ## 2. Key Components
        ### 2.1 Model Serving Layer
        • Load balancing strategies
        • Model versioning
        • A/B testing frameworks
        • Inference optimization

        ### 2.2 Data Processing Pipeline
        • Stream processing
        • Batch processing
        • Real-time analytics
        • Data validation

        ### 2.3 Monitoring and Observability
        • Prometheus integration
        • Grafana dashboards
        • Custom metrics
        • Alert systems

        ## 3. Implementation Patterns
        \`\`\`python
        class AIModelServer:
            def __init__(self):
                self.model_registry = ModelRegistry()
                self.inference_engine = InferenceEngine()
                self.metric_collector = MetricCollector()

            async def predict(self, input_data: Dict) -> Dict:
                model = await self.model_registry.get_latest_model()
                metrics = await self.metric_collector.collect()
                return await self.inference_engine.run(model, input_data, metrics)
        \`\`\`

        ## 4. Performance Optimization
        • Model quantization
        • Batch inference
        • Caching strategies
        • Hardware acceleration

        ## 5. Security Considerations
        • Model access control
        • Input validation
        • Rate limiting
        • Audit logging`,
        author: "Dr. Katherine Johnson",
        authorRole: "Principal AI Architect at TechForward",
        date: "2024-03-15",
        imageUrl: "https://picsum.photos/800/400",
        category: "AI Architecture",
        readTime: "25 min read",
        difficulty: "Advanced",
        tags: ["AI", "System Design", "Architecture", "Performance", "Security"],
        codeExamples: [
            {
                language: "python",
                code: `from typing import Dict, Optional
import asyncio
from prometheus_client import Counter, Histogram

class ModelRegistry:
    def __init__(self):
        self.models = {}
        self.version_counter = Counter(
            'model_version_requests',
            'Model version requests count'
        )
        self.load_time = Histogram(
            'model_load_duration_seconds',
            'Time spent loading model'
        )`,
                description: "Model Registry Implementation with Metrics"
            }
        ],
        references: [
            {
                title: "Designing Machine Learning Systems",
                author: "Chip Huyen",
                url: "https://learning.oreilly.com/library/view/designing-machine-learning/9781098107956/"
            },
            {
                title: "Machine Learning Design Patterns",
                author: "Valliappa Lakshmanan",
                url: "https://www.oreilly.com/library/view/machine-learning-design/9781098115777/"
            }
        ],
        academicCitations: [
            {
                title: "Attention Is All You Need",
                authors: ["Vaswani, A.", "et al."],
                year: 2017,
                journal: "NeurIPS",
                doi: "10.48550/arXiv.1706.03762"
            }
        ],
        systemRequirements: {
            cpu: "8+ cores",
            ram: "32GB+",
            gpu: "NVIDIA Tesla T4 or better",
            storage: "100GB SSD"
        },
        benchmarks: [
            {
                metric: "Inference Latency",
                value: "50ms",
                conditions: "Batch size 32, Tesla T4 GPU"
            }
        ],
        relatedConcepts: [
            {
                name: "Distributed Systems",
                relevance: "Critical for scaling AI operations"
            },
            {
                name: "DevOps Practices",
                relevance: "Essential for AI deployment"
            }
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
