// Kyle's photos
const placeholderImages = [
    'images/img1.jpg',
    'images/img2.jpg',
    'images/img3.jpg',
    'images/img4.jpg',
    'images/img5.jpg',
    'images/img6.jpg',
    'images/img7.jpg',
    'images/img8.jpg',
    'images/img9.jpg',
    'images/img10.jpg',
    'images/img11.jpg',
    'images/img12.jpg',
    'images/img13.jpg',
    'images/img14.jpg',
    'images/img15.jpg',
    'images/img16.jpg',
    'images/img17.jpg',
    'images/img18.jpg'
];

const canvas = document.getElementById('canvas');
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

// Initialize: create media items
function init() {
    placeholderImages.forEach((imgUrl, index) => {
        createMediaItem(imgUrl, index);
    });
}

// Create a draggable media item
function createMediaItem(src, index) {
    const item = document.createElement('div');
    item.className = 'media-item';
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'aesthetic';
    
    // Random positioning
    const randomX = Math.random() * (window.innerWidth - 400);
    const randomY = Math.random() * (window.innerHeight * 1.5);
    
    // Wide range of sizes - from small to max 2000px
    const sizeOptions = [
        '200px', '250px', '300px', '350px', '400px',  // Small/medium
        '500px', '600px', '700px', '800px', '900px',  // Large
        '1000px', '1200px', '1500px', '1800px', '2000px'  // Very large (capped at 2000px)
    ];
    const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
    
    item.style.left = `${randomX}px`;
    item.style.top = `${randomY}px`;
    item.style.width = randomSize;
    item.style.zIndex = index;
    
    item.appendChild(img);
    canvas.appendChild(item);
    
    // Add drag listeners
    item.addEventListener('mousedown', startDrag);
    
    // Bring to front on click
    item.addEventListener('click', bringToFront);
}

// Drag functionality
function startDrag(e) {
    draggedElement = e.currentTarget;
    draggedElement.classList.add('dragging');
    
    // Calculate offset from mouse to element's top-left
    const rect = draggedElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Bring to front
    const allItems = document.querySelectorAll('.media-item');
    const maxZ = Math.max(...Array.from(allItems).map(item => parseInt(item.style.zIndex || 0)));
    draggedElement.style.zIndex = maxZ + 1;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (!draggedElement) return;
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY + window.scrollY;
    
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
}

function stopDrag() {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null;
    }
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Bring clicked image to front
function bringToFront(e) {
    const clickedItem = e.currentTarget;
    const allItems = document.querySelectorAll('.media-item');
    const maxZ = Math.max(...Array.from(allItems).map(item => parseInt(item.style.zIndex || 0)));
    
    // Set clicked item to max + 1, but keep it below button (which is at 9999)
    clickedItem.style.zIndex = Math.min(maxZ + 1, 9998);
}

// Initialize on load
window.addEventListener('load', init);
