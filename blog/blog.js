// Blog handling script
document.addEventListener('DOMContentLoaded', function() {
    // This function will fetch and display blog posts
    async function loadBlogPosts() {
        try {
            // Fetch the blog index (could be a JSON file listing all posts)
            const response = await fetch('./posts/index.json');
            const posts = await response.json();

            // Sort posts by date (newest first)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Display posts in the container
            const container = document.getElementById('blog-posts-container');

            // Loop through posts
            for (const post of posts) {
                // Create post element
                const postDiv = document.createElement('div');
                postDiv.className = 'post-card';

                // Format the post HTML
                postDiv.innerHTML = `
          <div class="post-image">
            <div class="post-category">${post.category}</div>
          </div>
          <div class="post-content">
            <p class="post-meta">${formatDate(post.date)} • ${post.readingTime}</p>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="./posts/${post.slug}.html" class="read-more">Read more →</a>
          </div>
        `;

                // Add to container
                container.appendChild(postDiv);
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }

    // Helper function to format dates
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Initialize
    loadBlogPosts().catch(console.error);
});