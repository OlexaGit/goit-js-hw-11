import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const fieldFindCountry = document.querySelector('#search-box');
const listСountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

listСountry.style.fontSize = '24px';

fieldFindCountry.addEventListener(
  'input',
  debounce(
    event => {
      const elementFind = event.target.value.trim();
      if (elementFind === '') {
        clear();
        return;
      }
      fetchCountries(elementFind)
        .then(countries => {
          if (countries.length > 10) {
            clear();
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            return;
          } else {
            if (countries.length === 1) {
              listСountry.innerHTML = '';
              renderInfoOneCountry(countries);
            } else {
              infoCountry.innerHTML = '';
              renderCountrybetweenTwoAndTen(countries);
            }
          }
        })
        .catch(error => {
          clear();
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    },
    DEBOUNCE_DELAY
    // {
    //   leading: true,
    //   trailing: true,
    // }
  )
);

function renderCountrybetweenTwoAndTen(countries) {
  // console.log(countries);
  const markup = countries
    .flatMap(({ flags: { png, alt }, name }) => {
      return `
      <li><img src="${png}" width="30" alt="${alt}"></img>  ${name.official}</li>`;
    })
    .join('');
  listСountry.innerHTML = markup;
}

function renderInfoOneCountry(countries) {
  // console.log(countries[0].currencies);
  const ArrayOjectCurrencies = Object.values(countries[0].currencies);
  const currenciesName = ArrayOjectCurrencies.map(elem => elem.name).join(', ');
  const languagesName = Object.values(countries[0].languages).join(', ');
  // console.log(currenciesName);
  const markup = countries
    .flatMap(({ flags: { png, alt }, name, capital, population }) => {
      return `        
      <div style="font-size:30px"><img src="${png}" width="30" alt="${alt}"></img>  ${name.official}</div>
      <div style="font-weight:400"><span style="font-weight:700">Capital:</span> ${capital}</div>
      <div style="font-weight:400"><span style="font-weight:700">Currencies:</span> ${currenciesName}</div>
      <div style="font-weight:400"><span style="font-weight:700">Population:</span> ${population}</div>
      <div style="font-weight:400"><span style="font-weight:700">Languages:</span> ${languagesName}</div>`;
    })
    .join('');
  infoCountry.innerHTML = markup;
}

function clear() {
  listСountry.innerHTML = '';
  infoCountry.innerHTML = '';
}
