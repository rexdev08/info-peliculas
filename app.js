import { get, log } from "./funciones.js";
const $movies = get("div.movies");
const $menuBtn = document.getElementById("menu-btn");
const $popular = document.getElementById("popular");
const $top = document.getElementById("top");
const $commingSoon = document.getElementById("comming-soon");
const $categories = get(".header__menu")

let page = 1;
let categorySelected

function showMovies(entries) {
  entries.forEach((entrie) => {
    
    if (entrie.isIntersecting && page < 500) {
      page++
      getMovies(page, categorySelected);
    }
   
  });
}

const observer = new IntersectionObserver(showMovies, {
  root: null,
  rootMargin: "0px 0px 600px 0px",
  threshold: 1.0,
});

async function getMovies(page, category= "popular") {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=0dc5a070f36e84311c0ff991acad3019&language=es-MX&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  const movies = data.results;
  
    movies.forEach((movie) => {
      $movies.innerHTML += `
      <div class="card" title="${movie.title}">
        <img loading="lazy" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="${movie.title}"
          class="card__image" />
        <div class="card__text-container">
          <span class="card__rating">${movie.vote_average}</span>
          <h3 class="card__title">${movie.title}</h3>
        </div>
      </div>
      `;
    });
  
  const $cards = $movies.querySelectorAll("div.card");
  observer.observe($cards[$cards.length - 1]);
}

getMovies(page, categorySelected);


$top.addEventListener("click", ()=>{
  $movies.innerHTML= ""
  page = 1;
  categorySelected = "top_rated";
  $categories.classList.remove("header__menu--visible")
  getMovies(page, categorySelected)

})

$popular.addEventListener("click", ()=>{
  $movies.innerHTML= ""
  page = 1;
  categorySelected = "popular";
  $categories.classList.remove("header__menu--visible")
  getMovies(page, categorySelected)
})

$commingSoon.addEventListener("click", ()=>{
  $movies.innerHTML= ""
  page = 1;
  categorySelected = "upcoming";
  $categories.classList.remove("header__menu--visible")
  getMovies(page, categorySelected)
})

$menuBtn.addEventListener("click", ()=>{
  $categories.classList.toggle("header__menu--visible")
})