// Placeholder film aesthetic images from Unsplash
const placeholderImages = [
    'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400',
    'https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=400',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400',
    'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400',
    'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400',
    'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400',
    'https://images.unsplash.com/photo-1516962126636-27ad087061cc?w=400',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
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
