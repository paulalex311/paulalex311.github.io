let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

document.getElementById('nextBtn').addEventListener('click', () => {
    images[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].style.display = 'block';
});

document.getElementById('prevBtn').addEventListener('click', () => {
    images[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    images[currentIndex].style.display = 'block';
});