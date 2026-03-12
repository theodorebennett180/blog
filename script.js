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
    'images/img18.jpg',
    'images/img19.jpg',
    'images/img20.jpg',
    'images/img21.jpg',
    'images/img22.jpg',
    'images/img23.jpg',
    'images/img24.jpg',
    'images/img25.jpg',
    'images/img26.jpg'
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
    
    // Wide range of sizes - from small to max viewport width
    const sizeOptions = [
        200, 250, 300, 350, 400,  // Small/medium
        500, 600, 700, 800, 900,  // Large
        1000, 1200, 1500, 1800, 2000  // Very large
    ];
    let randomSizePx = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
    
    // Cap size to viewport width
    const maxWidth = window.innerWidth - 40; // 40px padding
    if (randomSizePx > maxWidth) {
        randomSizePx = maxWidth;
    }
    
    // Random positioning - constrain to viewport width
    const randomX = Math.random() * (window.innerWidth - randomSizePx);
    const randomY = Math.random() * (window.innerHeight * 1.5);
    
    item.style.left = `${Math.max(0, randomX)}px`;
    item.style.top = `${randomY}px`;
    item.style.width = `${randomSizePx}px`;
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
    
    let x = e.clientX - offsetX;
    const y = e.clientY - offsetY + window.scrollY;
    
    // Constrain horizontal position to viewport
    const itemWidth = draggedElement.offsetWidth;
    const maxX = window.innerWidth - itemWidth;
    x = Math.max(0, Math.min(x, maxX));
    
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

// Constrain all images to viewport on resize
function constrainToViewport() {
    const allItems = document.querySelectorAll('.media-item');
    allItems.forEach(item => {
        const itemWidth = item.offsetWidth;
        const currentLeft = parseInt(item.style.left);
        const maxX = window.innerWidth - itemWidth;
        
        // If item is now outside viewport, move it back in
        if (currentLeft > maxX) {
            item.style.left = `${Math.max(0, maxX)}px`;
        }
        
        // Also ensure minimum size if needed
        if (itemWidth > window.innerWidth - 40) {
            item.style.width = `${window.innerWidth - 40}px`;
        }
    });
}

// Handle title click - reload on homepage, return to collage on list view
function handleTitleClick() {
    const listView = document.getElementById('listView');
    const isListView = listView.classList.contains('active');
    
    if (isListView) {
        showCollageView();
    } else {
        location.reload();
    }
}

// Show list view
function showListView() {
    const canvas = document.getElementById('canvas');
    const listView = document.getElementById('listView');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const listBtn = document.getElementById('listBtn');
    
    canvas.classList.add('hidden');
    listView.classList.add('active');
    randomizeBtn.style.display = 'none';
    listBtn.style.display = 'none';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Populate list view if not already done
    if (listView.children.length === 1) { // Only title exists
        placeholderImages.forEach((imgUrl) => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = 'aesthetic';
            listView.appendChild(img);
        });
    }
}

// Show collage view
function showCollageView() {
    const canvas = document.getElementById('canvas');
    const listView = document.getElementById('listView');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const listBtn = document.getElementById('listBtn');
    
    canvas.classList.remove('hidden');
    listView.classList.remove('active');
    randomizeBtn.style.display = 'block';
    listBtn.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Initialize on load
window.addEventListener('load', init);

// Handle window resize
window.addEventListener('resize', constrainToViewport);
