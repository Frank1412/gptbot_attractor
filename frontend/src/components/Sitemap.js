import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

function Sitemap() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', mb: 3 }}>
        Site Map
      </Typography>
      <Box component="nav" aria-label="site navigation">
        <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 2 }}>
          Main Sections
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
          <li>
            <Link href="/" sx={{ display: 'block', mb: 1 }}>
              Home Page - Latest Articles
            </Link>
          </li>
          <li>
            <Link href="/categories" sx={{ display: 'block', mb: 1 }}>
              Article Categories
            </Link>
          </li>
          <li>
            <Link href="/about" sx={{ display: 'block', mb: 1 }}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" sx={{ display: 'block', mb: 1 }}>
              Contact Information
            </Link>
          </li>
        </Box>
      </Box>
    </Container>
  );
}

export default Sitemap;
