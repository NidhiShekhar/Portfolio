document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    // Replace with your actual Supabase URLs and details.
    const musicData = [
        {
            title: 'Cover of "Math Rock" by ichika Nito',
            videoSrc: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/music//ichika_cover.mp4' // Replace this
        },
        {
            title: 'Cover of "Best Part" by Daniel Ceaser and H.E.R.',
            videoSrc: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/music//best_part_cover.mp4' // Replace this
        },
        {
            title: 'Stairway to Heaven - Led Zeppelin',
            videoSrc: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/music//stairway_cover.mp4' // Replace this
        },
        {
            title: 'Cover of "Cherry Wine" by Hozier',
            videoSrc: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/music//cherrywine_cover.mp4' // Replace this
        },
        {
            title: 'Cover of "Like Real People Do" by Hozier',
            videoSrc: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/music//likerealppldo_cover.mp4' // Replace this
        }
    ];

    // --- DOM Elements ---
    const modal = document.getElementById('music-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close-modal');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    const slidesContainer = modal.querySelector('#music-gallery-slides');
    const titleElement = modal.querySelector('#music-gallery-title');

    // Find the Music hobby card to trigger the gallery
    const musicHobbyCard = Array.from(document.querySelectorAll('.hobby-card')).find(
        card => card.querySelector('h3').textContent.includes('Music')
    );

    let currentSlide = 0;

    // --- Functions ---

    function initMusicGallery() {
        slidesContainer.innerHTML = ''; // Clear previous content
        musicData.forEach(() => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slidesContainer.appendChild(slide);
        });
        showSlide(0); // Show the first slide
    }

    function openGallery() {
        initMusicGallery();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Important: Clear the slides to stop any playing video
        slidesContainer.innerHTML = '';
    }

    function showSlide(index) {
        if (index < 0) index = musicData.length - 1;
        if (index >= musicData.length) index = 0;
        currentSlide = index;

        // Update video content for the current slide
        const allSlides = slidesContainer.querySelectorAll('.gallery-slide');
        allSlides.forEach((slide, i) => {
            slide.innerHTML = ''; // Clear all slides to stop non-visible videos
            if (i === currentSlide) {
                const musicItem = musicData[i];
                const video = document.createElement('video');
                video.src = musicItem.videoSrc;
                video.controls = true;
                video.autoplay = true;
                slide.appendChild(video);
            }
        });

        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        titleElement.textContent = musicData[currentSlide].title;
    }

    // --- Event Listeners ---
    if (musicHobbyCard) {
        musicHobbyCard.addEventListener('click', openGallery);
    }

    closeBtn.addEventListener('click', closeGallery);
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGallery();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeGallery();
            else if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
            else if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
        }
    });
});