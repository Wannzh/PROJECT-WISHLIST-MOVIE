// Variable Penampung Api Key
const apiKey = "531677543216bf9f0467f885b08b84e4";
// Variable Penampung link api
const baseMovieUrl = "https://api.themoviedb.org/3/movie/";
const baseTvUrl = "https://api.themoviedb.org/3/tv/";
// Variable link Gambar
const urlImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
// Variable Untuk isi kontent dari api
const endpoints = {
  now_playing: `${baseMovieUrl}now_playing?language=en-US&api_key=${apiKey}&page=`,
  upcoming: `${baseMovieUrl}upcoming?language=en-US&api_key=${apiKey}&page=`,
  popular: `${baseMovieUrl}popular?language=en-US&api_key=${apiKey}&page=`,
  top_rated: `${baseMovieUrl}top_rated?language=en-US&api_key=${apiKey}&page=`,
  airing_today: `${baseTvUrl}airing_today?language=en-US&api_key=${apiKey}&page=`,
  on_the_air: `${baseTvUrl}on_the_air?language=en-US&api_key=${apiKey}&page=`,
  tv_popular: `${baseTvUrl}popular?language=en-US&api_key=${apiKey}&page=`,
  tv_top_rated: `${baseTvUrl}top_rated?language=en-US&api_key=${apiKey}&page=`
};

// Variable parameter
const urlParams = new URLSearchParams(location.search);
const category = urlParams.get("category");

// Variable untuk informasi page
let currentPage = 1;
let totalPages = 1;

// Function untuk menampilkan Hasil API Key
function content(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".content");
      // perulangan untuk menghapus previous content
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Menambahkan Content API dan pembuatan elem
      data.results.forEach((movie) => {
        const posterDiv = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const img = document.createElement("img");
        img.setAttribute("src", `${urlImage}${movie.poster_path}`);
        img.setAttribute("alt", movie.title);
        const judul = document.createElement("h4");
        judul.classList.add("judul");
        judul.textContent = movie.title || movie.name;
        const a = document.createElement("a");
        a.href = `film.html?id=${movie.id}&type=${category.includes('tv') ? 'tv' : 'movie'}`;
        figcaption.appendChild(judul);
        posterDiv.appendChild(img);
        posterDiv.appendChild(figcaption);
        posterDiv.setAttribute("class", movie.id);
        a.appendChild(posterDiv);
        container.appendChild(a);
      });

      // Update Pagination info
      updatePaginationInfo(data.page, data.total_pages);

      // Update Pagination buttons
      document.getElementById('prev-page').disabled = currentPage <= 1;
      document.getElementById('next-page').disabled = currentPage >= totalPages;
    })
    .catch((err) => console.error(err));
}

// Function untuk update Pagination info
function updatePaginationInfo(current, total) {
  const currentPageElem = document.getElementById('current-page');
  const totalPagesElem = document.getElementById('total-pages');
  currentPageElem.textContent = `Page ${current}`;
  totalPagesElem.textContent = total;
  totalPages = total;
}

// Mengatur Nama heading-title
const categoryMap = {
  popular: 'Popular Movies',
  now_playing: 'Now Playing',
  upcoming: 'Upcoming Movies',
  top_rated: 'Top Rated',
  airing_today: 'Airing Today',
  on_the_air: 'On The Air',
  tv_popular: 'Popular TV Shows',
  tv_top_rated: 'Top Rated TV Shows'
};

// Mengisi Nama Heading Sesuai dengan nama kategori
const title = categoryMap[category] || '';
document.getElementById('heading-title').textContent = title;

// Memuat content page
const endpoint = endpoints[category] + currentPage;
content(endpoint);

// Menambahkan Event di dalam button next & prev
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    content(endpoints[category] + currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    content(endpoints[category] + currentPage);
  }
});
