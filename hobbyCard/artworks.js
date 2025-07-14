// =====================================
// ART GALLERY MODAL FUNCTIONALITY WITH SUPABASE CDN
// =====================================

const allArtworks = [
    // Charcoal
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal//bamboo.jpg', title: 'Bamboo Plant' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal/mountain.jpg', title: 'Mountains' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal/inkpot.jpg', title: 'Letter' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal/banana.jpg', title: 'Fruits Basket - Charcoal' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal/flowerpot.jpg', title: 'Flower pot' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal/shoes.jpg', title: 'Shoes' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal/wine.jpg', title: 'Still life - Willow Charcoal' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/charcoal/winepencil.jpg', title: 'Wine Bottle - pencil' },
    // Watercolor
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//woman.png', title: 'Old Lady in traditionals' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//chilli.png', title: '"In a pickle"' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//hampi.png', title: 'Ruins of Hampi' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//horse.png', title: 'Horse - watercolors' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//rose.png', title: 'Rose' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//boat.png', title: 'Kerala' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//ship.png', title: 'Ship in a storm' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/watercolor//bird.png', title: 'Random bird - Ink wash and Watercolors' },
    // pen
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//toys.jpg', title: 'Toys' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//koala.jpg', title: 'Koala' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//orange.jpg', title: 'Orange' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//lady.jpg', title: 'Lady - Pen & Ink' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//owl.jpg', title: 'Owl' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//pot.jpg', title: 'Flower Pot' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//eagle.jpg', title: 'Eagle' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/pen//hampi2.jpg', title: 'Ruins of Hampi - Pen & Ink' },
    // colorpencil
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/colorpencil//kingfisher.jpg', title: 'Kingfisher' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/colorpencil//canary.jpg', title: 'Canary' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/colorpencil//bird.jpg', title: 'Sparrow' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/colorpencil//rose.jpg', title: 'Rose - Color Pencils' },
    // softpastels
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//wave.jpg', title: 'Waves' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//wineapple.jpg', title: 'Apple and Wine' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//brownpot.jpg', title: 'Kettle' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//fog.jpg', title: 'Foggy Path - Soft Pastels' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//heels.jpg', title: 'Red Heels' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//hut.jpg', title: 'Quaint House' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//lake.jpg', title: 'Lake' },
    { src: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/softpastels//duck.jpg', title: 'Ducks - Soft Pastels' },

];

// Helper: chunk array into groups of 4 for grid slides
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

const artworks = chunkArray(allArtworks, 4);

document.addEventListener('DOMContentLoaded', () => {
    // Find modal elements
    const modal = document.querySelector('.art-gallery-modal');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slidesContainer = document.querySelector('.gallery-slides');
    const titleElement = document.querySelector('.gallery-title');

    // Find the Fine Arts hobby card to attach event listener
    const fineArtsCard = Array.from(document.querySelectorAll('.hobby-card')).find(
        card => card.querySelector('h3').textContent.includes('Fine Arts')
    );

    let currentSlide = 0;

    function initGallery() {
        slidesContainer.innerHTML = '';
        artworks.forEach((slideGroup) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slideGroup.forEach((artwork) => {
                const img = document.createElement('img');
                img.src = artwork.src;
                img.alt = artwork.title || '';
                slide.appendChild(img);
            });
            slidesContainer.appendChild(slide);
        });
        // Show first slide title(s), filter out empty
        if (artworks.length > 0) {
            titleElement.textContent = artworks[0].map(a => a.title).filter(Boolean).join(', ');
        }
    }

    function openGallery() {
        initGallery();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        showSlide(0);
    }

    function closeGallery() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showSlide(index) {
        if (index < 0) index = artworks.length - 1;
        if (index >= artworks.length) index = 0;
        currentSlide = index;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Filter out empty titles to avoid extra commas
        titleElement.textContent = artworks[currentSlide].map(a => a.title).filter(Boolean).join(', ');
    }
// Function to create responsive artwork slides with vertical scrolling
    function createResponsiveArtworkSlides() {
        const artworkContainer = document.getElementById('artwork-container');
        if (!artworkContainer) return;

        const artworkItems = Array.from(artworkContainer.querySelectorAll('.artwork-item'));
        const slidesContainer = document.getElementById('artwork-slides-container');

        // Clear the slides container
        slidesContainer.innerHTML = '';

        // Group artworks into slides of 4
        for (let i = 0; i < artworkItems.length; i += 4) {
            const slide = document.createElement('div');
            slide.className = 'artwork-slide';

            // Add the next 4 artworks (or fewer if at the end)
            const slideArtworks = artworkItems.slice(i, i + 4);
            slideArtworks.forEach(artwork => {
                slide.appendChild(artwork.cloneNode(true));
            });

            slidesContainer.appendChild(slide);
        }

        // Apply responsive behavior
        applyResponsiveArtworkLayout();

        // Add resize listener to adjust layout when screen size changes
        window.addEventListener('resize', applyResponsiveArtworkLayout);
    }

// Function to apply responsive layout based on screen size
    function applyResponsiveArtworkLayout() {
        const slides = document.querySelectorAll('.artwork-slide');
        const isMobileView = window.innerWidth < 768;

        slides.forEach(slide => {
            if (isMobileView) {
                // Enable vertical scrolling on mobile
                slide.classList.add('vertical-scroll');
            } else {
                // Disable vertical scrolling on larger screens
                slide.classList.remove('vertical-scroll');
            }
        });
    }

// CSS to be added to your stylesheet
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .artwork-slide {
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 20px;
    }
    
    .artwork-slide.vertical-scroll {
        flex-direction: column;
        max-height: 80vh;
        overflow-y: auto;
        padding-right: 10px;
    }
    
    .artwork-slide .artwork-item {
        flex: 1 0 25%;
        padding: 10px;
    }
    
    .artwork-slide.vertical-scroll .artwork-item {
        flex: 0 0 auto;
        width: 100%;
    }
    
    @media (max-width: 768px) {
        .artwork-slide {
            margin-bottom: 30px;
        }
    }
`;
    document.head.appendChild(styleSheet);

// Initialize the responsive artwork slides when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        createResponsiveArtworkSlides();
    });
    // Event listeners
    if (fineArtsCard) fineArtsCard.addEventListener('click', openGallery);
    closeBtn.addEventListener('click', closeGallery);
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeGallery(); });
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeGallery();
            else if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
            else if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
        }
    });
});