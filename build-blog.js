// Add this function to build-blog.js
function generateCategoryPages(posts) {
    // Define categories with their titles
    const categories = {
        'technology': {
            title: 'Tech Journal - My Journey as a CS Grad',
            icon: '💻'
        },
        'travel': {
            title: 'Travel Diaries - Adventures Around the World',
            icon: '✈️'
        },
        'food': {
            title: 'Culinary Chronicles - Food I Love',
            icon: '🍰'
        },
        'video-games': {
            title: 'Gaming Corner - Virtual Worlds I Explore',
            icon: '🎮'
        },
        'art': {
            title: 'Creative Canvas - Art & Expression',
            icon: '🎨'
        },
        'lifestyle': {
            title: 'Living Mindfully - Lifestyle Reflections',
            icon: '🌿'
        }
    };

    // For each category, create a page with filtered posts
    Object.entries(categories).forEach(([category, info]) => {
        // Filter posts by category (case-insensitive)
        const categoryPosts = posts.filter(post =>
            post.category.toLowerCase() === category.toLowerCase()
        );

        const postCards = categoryPosts.map(post => `
      <div class="post-card">
        <div class="post-image">
          <div class="post-category">${post.category}</div>
        </div>
        <div class="post-content">
          <p class="post-meta">${new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })} • ${post.readingTime}</p>
          <h3>${post.title}</h3>
          <p>${post.excerpt || ''}</p>
          <a href="./posts/${post.slug}.html" class="read-more">Read more <span>→</span></a>
        </div>
      </div>
    `).join('');

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.title} - Nidhi's Blog</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="blog/blog-styles.css">
</head>
<body class="blog-body">
  <!-- Decorative header -->
  <div class="decorative-header"></div>

  <div class="blog-container">
    <!-- Category Header -->
    <section class="category-header">
      <div class="category-icon-large">${info.icon}</div>
      <h1>${info.title}</h1>
      <p class="category-description">Exploring all things ${category} - from my perspective.</p>
    </section>

    <!-- Posts Section -->
    <section class="posts-section">
      <div class="posts-grid">
        ${postCards.length > 0 ? postCards : `
          <div class="no-posts">
            <p>No posts in this category yet. Check back soon!</p>
          </div>
        `}
      </div>
    </section>

    <!-- Navigation Links -->
    <div class="category-nav">
      <a href="index.html" class="back-link">← All Categories</a>
    </div>

    <!-- Footer decoration -->
    <div class="footer-decoration">
      <span>✿</span>
      <span>✿</span>
      <span>✿</span>
    </div>
  </div>

  <div class="decorative-footer"></div>

  <!-- Navigation link back to main site -->
  <div class="nav-link">
    <a href="index.html">Back to Portfolio</a>
  </div>

  <script src="script.js"></script>
</body>
</html>`;

        fs.writeFileSync(path.join(__dirname, 'blog', `${category}.html`), html);
    });
}

// Update the buildBlog function to include generating category pages
function buildBlog() {
    const posts = getAllPosts();
    generatePostPages(posts);
    generateCategoryPages(posts); // Add this line
    createPostIndex(posts);
    console.log(`✅ Generated ${posts.length} blog posts and category pages`);
}
// Add this to your build-blog.js
function createSamplePost() {
    const sampleDir = path.join(__dirname, 'blog', 'markdown');
    if (!fs.existsSync(sampleDir)) {
        fs.mkdirSync(sampleDir, { recursive: true });
    }

    const samplePost = `---
title: "Getting Started with Web Development"
date: "2023-06-20"
category: "Technology"
excerpt: "My journey into the world of HTML, CSS, and JavaScript - the building blocks of the modern web."
---

# Getting Started with Web Development

This is a sample blog post to test the system.

## The Fundamentals

Every web developer starts with HTML, CSS, and JavaScript.
`;

    fs.writeFileSync(path.join(sampleDir, 'sample-post.md'), samplePost);
    console.log('✅ Created sample post');
}

// Call this before buildBlog()
createSamplePost();
buildBlog();