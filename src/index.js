// import { PixabayAPIClass } from './pixabay-api';

// const photosContainerElem = document.querySelector('.gallery');
// const submitButtonElem = document.querySelector('button');
// const formElem = document.querySelector('.search-form');

// const pixabayInstnace = new PixabayAPIClass();


// //пошук фото після натискання кнопки
// async function handleSubmit(event) {
//     event.preventDefault();
//     const searchQuery = document.querySelector('input').value.trim();

//     if (!searchQuery) { return; }
    
//     pixabayInstnace.q = searchQuery;

//     try {
//     const resultData = await pixabayInstnace.fetchPtotos().then(
//         resultData => {
//             console.log(JSON.stringify(resultData))
//             const photosArray = this.resultData.data.hits;
//             console.log(photosArray);
//             renderPhotoCard(photosArray);
//         }
//     );
    
//         } catch (error) {
//         console.log(error.message);
//     }
// }



// //слухач на форму
// formElem.addEventListener('submit', handleSubmit)

///////////
import axios from "axios";

//не оновлюється сторінка

const photosContainerElem = document.querySelector('.gallery');
const submitButtonElem = document.querySelector('button');
const formElem = document.querySelector('.search-form');

//слухач на форму
formElem.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const resultData = await fetchPtotos();
    renderPhotoCard(resultData);
  } catch (error) {
    console.log(error.message);
  }
});


//запит
async function fetchPtotos() {
  const API_KEY = '38678153-9f2a8d4533b12670e8b2dc2f4';
  const BASE_URL = 'https://pixabay.com/api/';
  
  const baseSearchParams = {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
    };

  let page = 1;
  let query = null;

  const params = new URLSearchParams({
    ...baseSearchParams,
    q: query,
    page: page,
})
  const resultData = await axios.get(`${BASE_URL}?${params}`);
  console.log(resultData);
  return resultData;
}

//пошук фото після натискання кнопки
// async function handleSubmit(event) {
//     event.preventDefault();
//   const searchQuery = document.querySelector('input').value.trim();
//   console.log(searchQuery);

//     if (!searchQuery) { return; }

//     q = searchQuery;
    
//     try {
//     const resultData = await fetchPtotos().then(
//       resultData => {
//             const photosArray = resultData.data.hits;
//             console.log(photosArray);
//             renderPhotoCard(photosArray);
//         }
//     );
    
//         } catch (error) {
//         console.log(error.message);
//     }
// }

//рендер розмітки одної картки
function renderPhotoCard(data) {
    const markup = data.map(photo => `<div class="photo-card">
  <img src=${photo.webformatURL} alt=${photo.tags} loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>${photo.likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${photo.views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${photo.downloads}
    </p>
  </div>
</div>`)
    .join('');
  photosContainerElem.innerHTML = markup;
}

