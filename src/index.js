// import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCountries } from './fetchCountries';
import axios from 'axios';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchEl = '';
let page = 1;
loadMoreBtn.style.display = 'none';
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', () => {
  page += 1;
  getsearchQuery(searchEl, page);
});

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  if (searchQuery.value === '') {
    event.currentTarget.reset();
    return;
  }

  galleryContainer.innerHTML = '';
  searchEl = searchQuery.value;
  getsearchQuery(searchEl, page);
  // console.log(response.data.hits);
  // loadMoreBtn.addEventListener('click', () => {
  //   page += 1;
  //   getsearchQuery(searchQuery.value, event.currentTarget, page);
  // });
}

async function getsearchQuery(searchEl, page = 1) {
  try {
    const per_page = 6;
    const myApiKey = '35687240-9029e9ca17f641307dafe05a9';
    const imageType = 'photo';
    const orientation = 'horizontal';
    const safesearch = 'true';
    const response = await axios.get(
      `https://pixabay.com/api/?key=${myApiKey}&q=${searchEl}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`
    );
    console.log(response);
    console.log('Загальна кількість зображень: ', response.data.totalHits);
    const lengthArray = response.data.hits.length;
    if (lengthArray === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      // event.reset();
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    renderGallery(response.data.hits);
  } catch (error) {
    console.error(error);
  }
}

function renderGallery(array) {
  const markup = array
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
  // galleryContainer.addEventListener('click', event => {
  //   event.preventDefault();
  // });

  /* SimpleLightbox */
  // Бібліотека містить метод refresh(), який обов'язково потрібно викликати щоразу після додавання нової групи карток зображень.
  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 100,
  });
  lightbox.refresh();
}

// function loadMore() {
// }

// fieldFindCountry.addEventListener(
//   'input',
//   debounce(event => {
//     const elementFind = event.target.value.trim();
//     if (elementFind === '') {
//       clear();
//       return;
//     }
//     fetchCountries(elementFind)
//       .then(countries => {
//         if (countries.length > 10) {
//           clear();
//           Notiflix.Notify.info(
//             'Too many matches found. Please enter a more specific name.'
//           );
//           return;
//         } else {
//           if (countries.length === 1) {
//             listСountry.innerHTML = '';
//             renderInfoOneCountry(countries);
//           } else {
//             infoCountry.innerHTML = '';
//             renderCountrybetweenTwoAndTen(countries);
//           }
//         }
//       })
//       .catch(error => {
//         clear();
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       });
//   }, 300)
// );

// function renderCountrybetweenTwoAndTen(countries) {
//   // console.log(countries);
//   const markup = countries
//     .flatMap(({ flags: { png, alt }, name }) => {
//       return `
//       <li><img src="${png}" width="30" alt="${alt}"></img>  ${name.official}</li>`;
//     })
//     .join('');
//   listСountry.innerHTML = markup;
// }

// function renderInfoOneCountry(countries) {
//   // console.log(countries[0].currencies);
//   const ArrayOjectCurrencies = Object.values(countries[0].currencies);
//   const currenciesName = ArrayOjectCurrencies.map(elem => elem.name).join(', ');
//   const languagesName = Object.values(countries[0].languages).join(', ');
//   // console.log(currenciesName);
//   const markup = countries
//     .flatMap(({ flags: { png, alt }, name, capital, population }) => {
//       return `
//       <div style="font-size:30px"><img src="${png}" width="30" alt="${alt}"></img>  ${name.official}</div>
//       <div style="font-weight:400"><span style="font-weight:700">Capital:</span> ${capital}</div>
//       <div style="font-weight:400"><span style="font-weight:700">Currencies:</span> ${currenciesName}</div>
//       <div style="font-weight:400"><span style="font-weight:700">Population:</span> ${population}</div>
//       <div style="font-weight:400"><span style="font-weight:700">Languages:</span> ${languagesName}</div>`;
//     })
//     .join('');
//   infoCountry.innerHTML = markup;
// }

// function clear() {
//   listСountry.innerHTML = '';
//   infoCountry.innerHTML = '';
// }
