const per_page = 6;
const myApiKey = '35687240-9029e9ca17f641307dafe05a9';
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
const axios = require('axios').default;
let totalPages = 1;

import axios from 'axios';
import Notiflix from 'notiflix';
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    return axios
      .get(
        `https://pixabay.com/api/?key=${myApiKey}&q=${this.searchQuery}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${this.page}&per_page=${per_page}`
      )
      .then(({ data: { hits }, data: { totalHits } }) => {
        const lengthArray = totalHits;
        totalPages = totalHits / per_page;
        if (lengthArray === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        } else if (this.page === 1) {
          Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        } else if (this.page > totalPages) {
          return this.toggleAlertPopup();
        }
        // console.log(data.data.hits);
        this.incrementPage();
        return hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  toggleAlertPopup() {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    // loadMoreBtn.style.display = 'none';

    // if (isAlertVisible) {
    //   return;
    // }
    // isAlertVisible = true;
    // alertPopup.classList.add('is-visible');
    // setTimeout(() => {
    //   alertPopup.classList.remove('is-visible');
    //   isAlertVisible = false;
    // }, 3000);
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
