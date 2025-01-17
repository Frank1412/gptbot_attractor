import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Box, Avatar, Stack } from '@mui/material';
import axios from 'axios';
import SEOHead from './SEOHead';
import ArticleStructuredData from './ArticleStructuredData';
import { Helmet } from 'react-helmet';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = 'http://localhost:6001/api/articles';
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(api);
        setArticles(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Loading articles...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4, color: 'error.main' }}>
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }

  const AIArticleStructuredData = ({ article }) => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "headline": article.title,
      "author": {
        "@type": "Person",
        "name": article.author,
        "jobTitle": article.authorRole
      },
      "description": article.content,
      "keywords": article.tags.join(", "),
      "about": {
        "@type": "Thing",
        "name": "Artificial Intelligence",
        "description": "Research and applications of AI and machine learning"
      },
      "educationalLevel": "Advanced",
      "genre": "Technical Documentation",
      "abstract": article.content.split('\n')[0],
      "citation": article.references.map(ref => ({
        "@type": "CreativeWork",
        "name": ref.title,
        "url": ref.url
      }))
    };

    return (
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    );
  };

  return (
    <>
      <SEOHead 
        title="Tech Blog - Latest Articles on Web Development, AI, and Software Architecture"
        description="Discover in-depth articles on web development, AI integration, software architecture, and more. Expert insights from industry leaders."
        keywords="web development, AI, software architecture, React, Node.js, microservices, ChatGPT, technical blog"
      />
      
      {articles.map(article => (
        <ArticleStructuredData key={article.id} article={article} />
      ))}
      
      <Box 
        component="main" 
        role="main"
        itemScope 
        itemType="https://schema.org/Blog"
      >
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '2rem', 
            mb: 4,
            textAlign: 'center'
          }}
        >
          Latest Web Development Articles
        </Typography>

        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item xs={12} md={4} key={article.id}>
              <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="isAccessibleForFree" content="true" />
                <meta itemProp="isFamilyFriendly" content="true" />
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.imageUrl}
                    alt={article.title}
                    itemProp="image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h2" 
                      component="h2"
                      itemProp="headline"
                      sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                    >
                      {article.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      paragraph
                      itemProp="description"
                    >
                      {article.content.split('\n')[0]}
                    </Typography>
                    
                    <div itemProp="author" itemScope itemType="https://schema.org/Person">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar 
                          alt={article.author} 
                          src={`https://i.pravatar.cc/150?u=${article.id}`} 
                          sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="caption" itemProp="name">
                          {article.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" itemProp="jobTitle">
                          {article.authorRole}
                        </Typography>
                      </Stack>
                    </div>

                    <meta itemProp="datePublished" content={article.date} />
                    
                    <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                      By {article.author} on {new Date(article.date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Read More
                    </Button>
                  </CardActions>
                </Card>
                <section itemProp="articleBody">
                  {article.content.split('\n').map((paragraph, index) => (
                    <Typography 
                      key={index} 
                      paragraph 
                      sx={{ mb: 2 }}
                      itemProp="text"
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </section>
                {article.codeExamples && (
                  <section>
                    <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 2 }}>
                      Code Examples
                    </Typography>
                    {article.codeExamples.map((example, index) => (
                      <pre key={index}>
                        <code className={`language-${example.language}`}>
                          {example.code}
                        </code>
                      </pre>
                    ))}
                  </section>
                )}
              </article>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default ArticleList;
