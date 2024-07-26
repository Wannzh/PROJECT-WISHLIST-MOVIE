// Variable untuk API Key
const apiKey = "531677543216bf9f0467f885b08b84e4";

// Base URL untuk API
const baseMovieUrl = "https://api.themoviedb.org/3/search/movie";
const baseTvUrl = "https://api.themoviedb.org/3/search/tv";

// Link Gambar
const urlImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

// Variable parameter
const urlParams = new URLSearchParams(location.search);
const query = urlParams.get('q');

// Mengambil elemen input dan container
const searchInput = document.getElementById("search-input");
const contentContainer = document.querySelector(".content");

// Fungsi untuk mencari data
function search(query) {
  const movieUrl = `${baseMovieUrl}?api_key=${apiKey}&language=en-US&include_adult=false&query=${encodeURIComponent(query)}&page=1`;
  const tvUrl = `${baseTvUrl}?api_key=${apiKey}&language=en-US&include_adult=false&query=${encodeURIComponent(query)}&page=1`;

  // promise untuk semua fecth dalam satu kali run
  Promise.all([
    fetch(movieUrl).then(response => response.json()),
    fetch(tvUrl).then(response => response.json())
  ])
  .then(([movieData, tvData]) => {
    // Display the search query in the heading
    const searchQueryElement = document.getElementById("search-query");
    searchQueryElement.textContent = query;

    // Hapus konten lama
    while (contentContainer.firstChild) {
      contentContainer.removeChild(contentContainer.firstChild);
    }

    // Menampilkan hasil pencarian movies dan pembuatan element
    if (movieData.results.length > 0) {
      movieData.results.forEach((movie) => {
        const movieFigure = document.createElement("figure");
        const movieImg = document.createElement("img");
        const movieTitle = document.createElement("h4");
        const movieLink = document.createElement("a");

        movieImg.setAttribute("src", `${urlImage}${movie.poster_path}`);
        movieImg.setAttribute("alt", movie.title);
        movieTitle.textContent = movie.title;
        movieLink.href = `film.html?id=${movie.id}&type=movie`;

        movieLink.appendChild(movieImg);
        movieLink.appendChild(movieTitle);
        movieFigure.appendChild(movieLink);
        contentContainer.appendChild(movieFigure);
      });
      // Jika hasil tidak ada maka akan memunculkan ini
    } else {
      const noMovies = document.createElement("p");
      noMovies.textContent = "No movies found.";
      contentContainer.appendChild(noMovies);
    }

    // Menampilkan hasil pencarian TV Shows dan pembuatan element
    if (tvData.results.length > 0) {
      tvData.results.forEach((tvShow) => {
        const tvFigure = document.createElement("figure");
        const tvImg = document.createElement("img");
        const tvTitle = document.createElement("h4");
        const tvLink = document.createElement("a");

        tvImg.setAttribute("src", `${urlImage}${tvShow.poster_path}`);
        tvImg.setAttribute("alt", tvShow.name);
        tvTitle.textContent = tvShow.name;
        tvLink.href = `film.html?id=${tvShow.id}&type=tv`;

        tvLink.appendChild(tvImg);
        tvLink.appendChild(tvTitle);
        tvFigure.appendChild(tvLink);
        contentContainer.appendChild(tvFigure);
      });
      // Jika hasil tidak ada maka akan memunculkan ini
    } else {
      const noTvShows = document.createElement("p");
      noTvShows.textContent = "No TV shows found.";
      contentContainer.appendChild(noTvShows);
    }
  })
  .catch((err) => console.error("Error fetching search results:", err));
}

// untuk menampilkan kontent sesuai isi search
if (query) {
  search(query);
}