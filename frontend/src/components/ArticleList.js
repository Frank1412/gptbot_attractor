import React, { useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, CardMedia, Typography, CardActions, 
  Button, Box, Chip, Stack, Divider, Avatar, Link 
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';
import SEOHead from './SEOHead';
import ArticleStructuredData from './ArticleStructuredData';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:6001/api/articles');
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

  // ... loading and error handling ...

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
            fontSize: '2.5rem', 
            mb: 1,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Latest in Tech
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 4,
            textAlign: 'center',
            color: 'text.secondary'
          }}
        >
          Expert insights on web development, AI, and software architecture
        </Typography>

        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item xs={12} md={4} key={article.id}>
              <article 
                itemScope 
                itemType="https://schema.org/BlogPosting"
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.imageUrl}
                    alt={article.title}
                    itemProp="image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip 
                      label={article.category}
                      color="primary"
                      size="small"
                      sx={{ mb: 2 }}
                    />
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
                    
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption">{article.readTime}</Typography>
                      </Stack>
                      <Typography variant="caption">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Stack>

                    <Box sx={{ mb: 2 }}>
                      {article.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Related Resources:
                    </Typography>
                    {article.relatedLinks.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        display="block"
                        sx={{ mb: 0.5 }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" variant="contained">
                      Read Full Article
                    </Button>
                  </CardActions>
                </Card>
              </article>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default ArticleList;
