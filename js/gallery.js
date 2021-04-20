import galleryItems from "../gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const modalCloseButtonRef = document.querySelector('.lightbox__button[data-action="close-lightbox"]');
const modalImageRef = document.querySelector('.lightbox__image');

const galleryMarkup = galleryItems.map(( el, index ) => {
    return `<li class="gallery__item">
              <a class="gallery__link" href="${el.original}">
                 <img class="gallery__image"
                    data-value="${index}"
                    src="${el.preview}"
                    data-source="${el.original}"
                    alt="${el.description}"
                  />
              </a>
             </li>`;
})
  .join('');

// console.log(galleryMarkup);
        
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

function modalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  setModalImage(Number(event.target.dataset.value));
  modalRef.classList.add('is-open');
  window.addEventListener('keydown', modalKeyHandler);
};

galleryRef.addEventListener('click', (event) => {
  modalOpen(event);
});

function modalClose(event) {
  modalRef.classList.remove('is-open');
  setModalImageAttributes('', '');
  window.removeEventListener('keydown', modalKeyHandler);
};

modalCloseButtonRef.addEventListener('click', (event) => {
  modalClose(event);
});

modalOverlayRef  .addEventListener('click', (event) => {
  modalClose(event);
});

function setModalImage(indexOfImage) {
  modalImageRef.dataset.value = indexOfImage;
  setModalImageAttributes(galleryItems[indexOfImage].original, galleryItems[indexOfImage].description)
};

function setModalImageAttributes(src, alt) {
  modalImageRef.src = src;
  modalImageRef.alt = alt;
};

function changeModalImage(count) {
  const newIndex = Number(modalImageRef.dataset.value) + count;
  if (newIndex === -1) {
    setModalImage(galleryItems.length - 1)
  } else if (newIndex === galleryItems.length) {
    setModalImage(0)
  } else {
    setModalImage(newIndex)
  };
  // console.log('newIndex', newIndex);
  // console.log('modalImageRef.dataset.value', modalImageRef.dataset.value);
  // console.log('galleryItems.length', galleryItems.length);
};

function modalKeyHandler(event) {
  switch (event.code) {
    case 'Escape':
      modalClose();
      break;
    case 'ArrowLeft':
      changeModalImage(-1);
      break;
    case 'ArrowRight':
      changeModalImage(+1);
      break;
  };
};