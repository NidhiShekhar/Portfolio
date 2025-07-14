document.addEventListener('DOMContentLoaded', function() {
    // Photography gallery configuration
    const photos = [
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/eye/eye1.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/flower/flower5.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/sky/sky2.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/tree/nocturne.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/eye/eye2.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/flower/flower2.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/sky/sky3.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/eye/eye3.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/flower/flower4.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/eye/eye4.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/sky/sky1.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/flower/flower3.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/tree/pink2.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/sky/sky4.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/sky/sky5.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/mysore/mysore1.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/mysore/mysore2.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/mysore/mysore3.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/mysore/mysore4.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/water/water2.jpg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/mysore/mysore5.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/mysore/mysore6.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/water/water3.jpg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/mysore/mysore7.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/tree/pink1.jpeg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/eye/eye5.jpg'},
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/water/water1.jpg' },
        { url: 'https://ziffbxnacyimlxjtpsae.supabase.co/storage/v1/object/public/photography/flower/flower1.jpeg' },

        // Add more photos as needed
    ];
    // Find the photography hobby card element
    const photographyHobby = document.querySelector('[data-hobby="photography"]') ||
        document.querySelector('.hobby-card:nth-child(3)');

    // Photography modal elements
    const photographyModal = document.getElementById('photography-modal');
    const closeModalBtn = photographyModal.querySelector('.close-modal');
    const galleryGrid = document.getElementById('photography-gallery-grid');

    // Display photos in the grid
    function displayPhotos() {
        galleryGrid.innerHTML = '';

        photos.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';

            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = photo.title;
            img.loading = 'lazy';

            img.onerror = function() {
                console.error(`Failed to load image: ${photo.url}`);
                this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            };

            const caption = document.createElement('div');
            caption.className = 'photo-caption';
            caption.textContent = `${photo.title} (${photo.category})`;

            photoItem.appendChild(img);
            photoItem.appendChild(caption);
            galleryGrid.appendChild(photoItem);
        });
    }

    // Open modal when clicking on photography hobby card
    if (photographyHobby) {
        photographyHobby.addEventListener('click', function() {
            console.log("Photography hobby clicked");
            photographyModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            displayPhotos();
        });
    } else {
        console.error("Photography hobby element not found");
    }

    // Close modal
    closeModalBtn.addEventListener('click', function() {
        photographyModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside content
    photographyModal.addEventListener('click', function(event) {
        if (event.target === photographyModal) {
            photographyModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Prevent closing when clicking inside content
    photographyModal.querySelector('.modal-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});