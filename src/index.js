import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './on-search';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

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
    if (newsApiService.isBtnVisible) {
      return;
    }
    renderGallery(hits);
    if (newsApiService.isBtnVisible) {
      loadMoreBtn.style.display = 'none';
    }
  });
}

function onLoadMore() {
  newsApiService.fetchArticles().then(hits => {
    renderGallery(hits);
    if (newsApiService.isBtnVisible) {
      loadMoreBtn.style.display = 'none';
    }
  });
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
  loadMoreBtn.style.display = 'none';
}
