// Import descris în documentație:
import SimpleLightbox from 'simplelightbox';
// Import suplimentar de stil:
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

// Selectăm elementul de listă pentru galerie:
const listEl = document.querySelector('.gallery');

// Ne cream elementele listei <ul> cu clasa gallery:
galleryItems.forEach(item => {
  const listItemEl = document.createElement('li');
  listItemEl.classList.add('gallery__item');
  listItemEl.style.listStyle = 'none'; // eliminam marcatorul implicit (• bullet) din listă.
  listItemEl.innerHTML = `<a 
        class='gallery__link' 
        href='${item.original}'>
          <img 
          class='gallery__image' 
          src='${item.preview}' 
          alt='${item.description}'
          />
        </a>`;
  listEl.append(listItemEl);
});

// Inițializarea librăriei SimpleLightbox:
var lightbox = new SimpleLightbox('.gallery a', {
  sourceAttr: 'href',
  captionsData: 'alt',
  captionPosition: 'bottom',
  navText: ['←', '→'],
  closeText: '×',
  captionDelay: 250,
  animationSpeed: 250,
  fadeSpeed: 300,
  showCounter: true,
  // alte opțiuni pot fi adăugate aici
});
