### 24. Image Carousel with Lazy Loading 
**Question:** 
Implement an image carousel component with lazy loading for images. The carousel should allow users to navigate through images and load images only when they come into view. 
**Example:** 
```javascript 
class ImageCarousel { 
 constructor(containerId, images) { 
 this.container = document.getElementById(containerId); 
 this.images = images; 
 this.currentIndex = 0; 
 this.render(); 
 } 
 render() { 
 this.container.innerHTML = ''; 
 const img = document.createElement('img'); 
 img.className = 'carousel-image'; 
 img.src = this.images[this.currentIndex]; 
 img.loading = 'lazy'; 
 this.container.appendChild(img); 
 const prevButton = document.createElement('button'); 
 prevButton.textContent = 'Previous'; 
 prevButton.onclick = this.prevImage.bind(this); 
 this.container.appendChild(prevButton); 
 const nextButton = document.createElement('button'); 
 nextButton.textContent = 'Next'; 
 nextButton.onclick = this.nextImage.bind(this); 
 this.container.appendChild(nextButton); 
 } 
 prevImage() { 
 this.currentIndex = (this.currentIndex - 1 + this.images.length) % 
this.images.length; 
 this.render(); 
 } 
 nextImage() { 
 this.currentIndex = (this.currentIndex + 1) % this.images.length; 
 this.render(); 
 } 
} 
const images = [ 
 'https://via.placeholder.com/400x300?text=Image+1', 
 'https://via.placeholder.com/400x300?text=Image+2', 
 'https://via.placeholder.com/400x300?text=Image+3' 

]; 
new ImageCarousel('carousel-container', images); 
// HTML 
// <div id="carousel-container"></div> 
// CSS 
// .carousel-image { 
// width: 400px; 
// height: 300px; 
// display: block; 
// margin-bottom: 10px; 
// } 
``` 
