// Variable Penampung Api Key
const apiKey = "531677543216bf9f0467f885b08b84e4";
// Variable Penampung link api
const baseUrl = "https://api.themoviedb.org/3/movie/";
// Variable Untuk isi kontent dari api
const endpoints = {
  nowPlaying: `${baseUrl}now_playing?language=en-US&page=1&api_key=${apiKey}`,
  upcoming: `${baseUrl}upcoming?language=en-US&page=1&api_key=${apiKey}`,
  popular: `${baseUrl}popular?language=en-US&page=1&api_key=${apiKey}`,
};
// Variable Untuk link gambar
const urlImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

// Function untuk menampilkan api
function content(url, containerId) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Pembuatan Element dan Mengisi dengan content API
      const container = document.getElementById(containerId);
      data.results.forEach((movie) => {
        const posterDiv = document.createElement("figure");
        const figcaption = document.createElement('figcaption');
        const img = document.createElement("img");
        img.setAttribute("src", `${urlImage}${movie.poster_path}`);
        img.setAttribute("alt", movie.title);
        const judul = document.createElement('h4');
        judul.classList.add('judul');
        judul.textContent = movie.title;
        const a = document.createElement("a");
        // Mengambil data dari id dan type untuk detail
        a.href = `film.html?id=${movie.id}&type=movie`;
        figcaption.appendChild(judul);
        posterDiv.appendChild(img);
        posterDiv.appendChild(figcaption);
        posterDiv.setAttribute('class', movie.id);
        a.appendChild(posterDiv);
        container.appendChild(a);        
      });
    })
    .catch((err) => console.error(err));
}

// Pemanggilan function sesuai urutan
content(endpoints.popular, "popular");
content(endpoints.nowPlaying, "now-playing");
content(endpoints.upcoming, "up-coming");

// Menambahkan event listener untuk tombol trailer
document.querySelectorAll('.trailer-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const movieId = button.id;
    window.location.href = `film.html?id=${movieId}&type=movie`; // Added type parameter
  });
});

// Untuk Slider Display Home
const button = document.querySelectorAll('.slider-home');
const slides = document.querySelectorAll('.slider video');
const slideTexts = document.querySelectorAll('.slide-text');

// Ini Unutk Mengubah Slide ketika button di klik
const changeSlide = function(manual) {
  button.forEach((btn) => {
    btn.classList.remove('active');
  });

  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  slideTexts.forEach((text) => {
    text.classList.remove('active');
  });

  button[manual].classList.add('active');
  slides[manual].classList.add('active');
  slideTexts[manual].classList.add('active');
};

// Untuk Menambahkan Event ketika tombol di klik 
button.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    changeSlide(i);
  });
});
