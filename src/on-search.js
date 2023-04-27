const per_page = 40;
const myApiKey = '35687240-9029e9ca17f641307dafe05a9';
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
const axios = require('axios').default;

import Notiflix from 'notiflix';
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 1;
    this.lengthArray = 0;
    this.isBtnVisible = false;
  }

  async fetchArticles() {
    try {
      return await axios
        .get(
          `https://pixabay.com/api/?key=${myApiKey}&q=${this.searchQuery}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${this.page}&per_page=${per_page}`
        )
        .then(({ data: { hits }, data: { totalHits } }) => {
          this.lengthArray = totalHits;
          this.totalPages = totalHits / per_page;
          if (this.lengthArray === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          } else if (this.page === 1) {
            Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
          }
          if (this.page > this.totalPages) {
            this.isBtnVisible = true;
            this.toggleAlertPopup();
          }
          this.incrementPage();
          return hits;
        });
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
    this.isBtnVisible = false;
  }

  toggleAlertPopup() {
    setTimeout(() => {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }, 1000);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
