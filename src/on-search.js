export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles(searchQuery) {
    const per_page = 6;
    const myApiKey = '35687240-9029e9ca17f641307dafe05a9';
    const imageType = 'photo';
    const orientation = 'horizontal';
    const safesearch = 'true';
    const axios = require('axios').default;
    return axios
      .get(
        `https://pixabay.com/api/?key=${myApiKey}&q=${this.searchQuery}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${this.page}&per_page=${per_page}`
      )
      .then(data => {
        this.incrementPage();
        // console.log(data.data.hits);
        return data.data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
}