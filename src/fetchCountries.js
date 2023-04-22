export const fetchCountries = name => {
  // console.log(name);
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name;fields=capital;fields=currencies;fields=population;fields=flags;fields=languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
