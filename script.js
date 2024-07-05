document.addEventListener('DOMContentLoaded', () => {
    
    /* Typing effect */
    const text = "To get something you never had .... You have to do something you never did.";
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 140);
        } else {
            setTimeout(() => {
                typingElement.textContent = '';
                index = 0;
                type();
            }, 2000);
        }
    }

    type();

    // Preview window script
    const previews = document.querySelectorAll('.document-preview');
    const tooltip = document.getElementById('preview-tooltip');

    previews.forEach(preview => {
        const img = preview.querySelector('img');
        const link = preview.querySelector('a');

        img.addEventListener('mouseover', function() {
            const rect = img.getBoundingClientRect();
            const linkHref = link.getAttribute('href');

            // Set tooltip content and position
            tooltip.innerHTML = `<iframe src="${linkHref}" width="100%" height="300px"></iframe>`;
            tooltip.style.top = `${rect.top + window.scrollY}px`;
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.display = 'block';
        });

        img.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });

    const gridItems = document.querySelectorAll('.grid-item');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const previewVideo = document.getElementById('preview-video');

    gridItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const previewType = item.getAttribute('data-preview-type');
            const previewSrc = item.getAttribute('data-preview-src');

            if (previewType === 'image') {
                previewImage.src = previewSrc;
                previewImage.style.display = 'block';
                previewVideo.style.display = 'none';
                previewVideo.pause();
                previewVideo.currentTime = 0;
            } else if (previewType === 'video') {
                previewVideo.src = previewSrc;
                previewVideo.style.display = 'block';
                previewImage.style.display = 'none';
                
                previewVideo.load();
                previewVideo.play().catch(error => {
                    console.log('Autoplay prevented:', error);
                });
            }

            previewContainer.style.display = 'block';
        });

        item.addEventListener('mouseleave', () => {
            previewContainer.style.display = 'none';
            previewImage.src = '';
            previewVideo.pause();
            previewVideo.src = '';
        });
    });
});
