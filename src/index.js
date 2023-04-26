import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './on-search';
import axios from 'axios';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();

loadMoreBtn.style.display = 'none';
form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
// console.log(newsApiService.totalHits);

function onSearch(e) {
  e.preventDefault();

  clearContainer();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  if (newsApiService.searchQuery === '') {
    e.currentTarget.reset();
    return;
  }
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(hits => {
    renderGallery(hits);
  });
}

function onLoadMore() {
  newsApiService.fetchArticles().then(renderGallery);
}

function renderGallery(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `       
    <div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>  
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>        
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    </div>
  `;
      }
    )
    .join('');

  loadMoreBtn.style.display = 'inline-block';
  galleryContainer.insertAdjacentHTML('beforeend', markup);

  /* SimpleLightbox */
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function clearContainer() {
  galleryContainer.innerHTML = '';
}

// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchCountries } from './fetchCountries';
// import axios from 'axios';

// const form = document.querySelector('#search-form');
// const galleryContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// let searchEl = '';
// let page = 1;
// loadMoreBtn.style.display = 'none';
// form.addEventListener('submit', handleSubmit);
// loadMoreBtn.addEventListener('click', () => {
//   page += 1;
//   getsearchQuery(searchEl, page);
// });

// function handleSubmit(event) {
//   event.preventDefault();
//   const {
//     elements: { searchQuery },
//   } = event.currentTarget;
//   if (searchQuery.value === '') {
//     event.currentTarget.reset();
//     return;
//   }

//   galleryContainer.innerHTML = '';
//   searchEl = searchQuery.value;
//   getsearchQuery(searchEl, page);
// }

// async function getsearchQuery(searchEl, page = 1) {
//   try {
//     const per_page = 6;
//     const myApiKey = '35687240-9029e9ca17f641307dafe05a9';
//     const imageType = 'photo';
//     const orientation = 'horizontal';
//     const safesearch = 'true';
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${myApiKey}&q=${searchEl}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`
//     );
//     console.log(response);
//     console.log('Загальна кількість зображень: ', response.data.totalHits);
//     const lengthArray = response.data.hits.length;
//     if (lengthArray === 0) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       // event.reset();
//       return;
//     }
//     Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
//     renderGallery(response.data.hits);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function renderGallery(array) {
//   const markup = array
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `
//     <div class="photo-card">
//         <a class="gallery__link" href="${largeImageURL}">
//           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         </a>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes</b>
//           ${likes}
//         </p>
//         <p class="info-item">
//           <b>Views</b>
//           ${views}
//         </p>
//         <p class="info-item">
//           <b>Comments</b>
//           ${comments}
//         </p>
//         <p class="info-item">
//           <b>Downloads</b>
//           ${downloads}
//         </p>
//       </div>
//     </div>
//   `;
//       }
//     )
//     .join('');

//   loadMoreBtn.style.display = 'inline-block';
//   galleryContainer.insertAdjacentHTML('beforeend', markup);

//   /* SimpleLightbox */
//   const lightbox = new SimpleLightbox('.gallery a', {
//     captionDelay: 100,
//   });
//   lightbox.refresh();
// }
