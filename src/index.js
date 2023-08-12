import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const photosContainerElem = document.querySelector('.gallery');
const submitButtonElem = document.querySelector('button');
const formElem = document.querySelector('.search-form');
const loadMoreButtonElem = document.querySelector('.load-more');
const endTextElem = document.querySelector('.end-text');
const infoAmountElem = document.querySelector('.info-about-amount')

//слухач на форму
formElem.addEventListener('submit', (event) => {
  event.preventDefault();
  photosContainerElem.innerHTML = '';

  page = 1;
  
  const searchQuery = document.querySelector('input').value.trim();
  console.log(searchQuery);
  if (!searchQuery) { return; }
  q = searchQuery;

  handleLoad();
});

// //слухач на кнопку load more 
loadMoreButtonElem.addEventListener('click', () => {
  page += 1;
  handleLoad();

  // const { height: cardHeight } = photosContainerElem.firstElementChild.getBoundingClientRect();
  //    window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: "smooth",
  //   });
})

//функція завантаження - пошук і load more
async function handleLoad() {
  try {
    loadMoreButtonElem.classList.add('is-hidden');

    const data = await fetchPtotos();
    const resultData = data.data.hits;
    renderPhotoCard(resultData);

    if (page > 1)
    {const { height: cardHeight } = photosContainerElem.firstElementChild.getBoundingClientRect();
     window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });}

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
    })  
    lightbox.refresh();
    
    
    console.log(resultData.length);
    console.log(data.data.totalHits)
    console.log(page)
    const totalPages = data.data.totalHits / per_page;
    const amount = resultData.length * page;

    if (!resultData.length) {
      Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (page < totalPages) {
      loadMoreButtonElem.classList.remove('is-hidden');
      infoAmountElem.classList.remove('is-hidden');
      infoAmountElem.innerHTML = `${amount} of ${data.data.totalHits} results are shown`;
    } else {
      loadMoreButtonElem.classList.add('is-hidden');
      infoAmountElem.classList.add('is-hidden');
      endTextElem.classList.remove('is-hidden');
      console.log(endTextElem)
    }
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure(
            `${error.message}! Please reload page and try again.`
          );
  }
}

//запит на сервер
let q;
let page = 1;
let per_page = 40;
 
async function fetchPtotos() {
  const API_KEY = '38678153-9f2a8d4533b12670e8b2dc2f4';
  const BASE_URL = 'https://pixabay.com/api/';
  
  const baseSearchParams = {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page,
    };

  // let page = 1;
  // let query = null;

  const params = new URLSearchParams({
    ...baseSearchParams,
    q,
    page,
})
  const resultData = await axios.get(`${BASE_URL}?${params}`);
  console.log(resultData);
  console.log(resultData.data.hits);
  console.log(`${BASE_URL}?${params}`);
  return resultData;
}

//рендер розмітки одної картки
function renderPhotoCard(data) {
    const markup = data.map(photo => `
    <a class="gallery-link" href="${photo.largeImageURL}">
  <div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  <ul class="info">
    <li class="info-item likes">
      <b>Likes: </b>${photo.likes}
    </li>
    <li class="info-item views">
      <b>Views: </b>${photo.views}
    </li>
    <li class="info-item comments">
      <b>Comments: </b>${photo.comments}
    </li>
    <li class="info-item downloads">
      <b>Downloads: </b>${photo.downloads}
    </li>
  </ul>
</div>
</a>

`)
    .join('');
  
photosContainerElem.insertAdjacentHTML('beforeend', markup);
}


