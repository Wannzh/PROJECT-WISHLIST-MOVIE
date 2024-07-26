// Variable Untuk link gambar
const urlImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
// Link Embed
const embedVideo = "https://www.youtube.com/embed/";

// Mengambil nilai url
const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");
const type = urlParams.get("type"); // new parameter to distinguish between movie and TV show

// API Key
const apiKey = "531677543216bf9f0467f885b08b84e4";

// Base URLs
const baseMovieUrl = "https://api.themoviedb.org/3/movie/";
const baseTvUrl = "https://api.themoviedb.org/3/tv/";

// Fetch details function
function fetchDetails() {
  const url = type === "movie" ? `${baseMovieUrl}${id}?api_key=${apiKey}` : `${baseTvUrl}${id}?api_key=${apiKey}&language=en-US`;
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Mengambil dan mengisi Element
      const container = document.querySelector(".movie");
      // if di lakukan agar memeriksa isi element dan tidak adanya eror ketika element kosong
      if (container) {
        const background = container.querySelector(".bg");
        const figure = container.querySelector("figure");
        const poster = figure ? figure.querySelector("img") : null;
        const desk = container.querySelector(".title");

        if (desk) {
          const judul = desk.querySelector("h1");
          const rilisGenre = desk.querySelector("p span");
          const rating = desk.querySelectorAll("p")[1];
          const tagline = desk.querySelectorAll("p")[2];
          const deskripsi = desk.querySelectorAll("p")[3];

          if (background) background.setAttribute("src", `${urlImage}${data.backdrop_path}`);
          if (poster) poster.setAttribute("src", `${urlImage}${data.poster_path}`);
          if (judul) judul.innerText = type === "movie" ? data.title : data.name;
          if (rilisGenre)
            rilisGenre.innerText = type === "movie" ? `${data.release_date} | ${data.genres.map((genre) => genre.name).join(", ")}` : `${data.first_air_date} | ${data.genres.map((genre) => genre.name).join(", ")}`;
          if (rating) rating.innerText = `Rating: ${data.vote_average}`;
          if (tagline) tagline.innerText = data.tagline;
          if (deskripsi) deskripsi.innerText = data.overview;
        } else {
          console.error("Element .title not found");
        }
      } else {
        console.error("Element .movie not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}

// Fetch trailer function
function fetchTrailer() {
  const url = type === "movie" ? `${baseMovieUrl}${id}/videos?api_key=${apiKey}&language=en-US` : `${baseTvUrl}${id}/videos?api_key=${apiKey}&language=en-US`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Mengambil dan mengisi Element
      const playButton = document.querySelector(".play");
      // if di lakukan agar memeriksa isi element dan tidak adanya eror ketika element kosong
      if (playButton) {
        const trailer = document.getElementById("trailer");
        const trailerVideo = document.getElementById("trailer-video");
        const close = trailer.querySelector(".close");

        playButton.addEventListener("click", () => {
          const videoKey = data.results.find((video) => video.type == "Trailer")?.key;
          if (videoKey) {
            trailerVideo.src = `${embedVideo}${videoKey}`;
            trailer.style.display = "block";
          } else {
            console.error("No trailer video found");
          }
        });

        close.addEventListener("click", () => {
          trailer.style.display = "none";
          trailerVideo.src = "";
        });

        window.addEventListener("click", (event) => {
          if (event.target == trailer) {
            trailer.style.display = "none";
            trailerVideo.src = "";
          }
        });
      } else {
        console.error("Element .play not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching video data:", err);
    });
}

// Fetch cast function
function fetchCast() {
  const url = type === "movie" ? `${baseMovieUrl}${id}/credits?api_key=${apiKey}&language=en-US` : `${baseTvUrl}${id}/credits?api_key=${apiKey}&language=en-US`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Mengambil dan mengisi Element
      const castContainer = document.querySelector(".cast .content");
      // if di lakukan agar memeriksa isi element dan tidak adanya eror ketika element kosong
      if (castContainer) {
        data.cast.forEach((actor) => {
          const castFigure = document.createElement("figure");
          const castImg = document.createElement("img");
          const figcaption = document.createElement("figcaption");
          const castName = document.createElement("p");
          castName.classList.add("cast-name");
          const castCharater = document.createElement("p");
          castCharater.classList.add("cast-char");

          castImg.setAttribute("src", `${urlImage}${actor.profile_path}`);
          castName.innerText = actor.name;
          castCharater.innerText = actor.character;

          figcaption.appendChild(castName);
          figcaption.appendChild(castCharater);
          castFigure.appendChild(castImg);
          castFigure.appendChild(figcaption);
          castContainer.appendChild(castFigure);
        });
      } else {
        console.error("Element .cast .content not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching cast data:", err);
    });
}

// Fetch recommendations function
function fetchRecommendations() {
  const url = type === "movie" ? `${baseMovieUrl}${id}/recommendations?api_key=${apiKey}&language=en-US&page=1` : `${baseTvUrl}${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Mengambil dan mengisi Element
      const recomendContainer = document.querySelector(".recomend .content");
      // if di lakukan agar memeriksa isi element dan tidak adanya eror ketika element kosong
      if (recomendContainer) {
        data.results.forEach((recomend) => {
          const recomenFigure = document.createElement('figure');
          const recomenImg = document.createElement('img');
          const recomenJudul = document.createElement('h4');
          const figcaption = document.createElement('figcaption');
          const a = document.createElement('a');

          a.href = `film.html?id=${recomend.id}&type=${type}`;
          recomenImg.setAttribute('src', `${urlImage}${recomend.poster_path}`);
          recomenJudul.textContent = recomend.title || recomend.name;
          figcaption.appendChild(recomenImg);
          figcaption.appendChild(recomenJudul);
          recomenFigure.appendChild(figcaption);
          a.appendChild(recomenFigure);
          recomendContainer.appendChild(a);
        });
      } else {
        console.error("Element .recomend .content not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching recommendations data:", err);
    });
}

// Fetch similar content function
function fetchSimilar() {
  const url = type === "movie" ? `${baseMovieUrl}${id}/similar?api_key=${apiKey}&language=en-US&page=1` : `${baseTvUrl}${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Mengambil dan mengisi Element
      const similarContainer = document.querySelector('.similar .content');
      // if di lakukan agar memeriksa isi element dan tidak adanya eror ketika element kosong
      if (similarContainer) {
        data.results.forEach((similar) => {
          const similarFigure = document.createElement('figure');
          const similarImg = document.createElement('img');
          const similarJudul = document.createElement('h4');
          const figcaption = document.createElement('figcaption');
          const a = document.createElement('a');

          a.href = `film.html?id=${similar.id}&type=${type}`;
          similarImg.setAttribute('src', `${urlImage}${similar.poster_path}`);
          similarJudul.textContent = similar.title || similar.name;
          figcaption.appendChild(similarImg);
          figcaption.appendChild(similarJudul);
          similarFigure.appendChild(figcaption);
          a.appendChild(similarFigure)
          similarContainer.appendChild(a);
        });
      } else {
        console.error("Element .similar .content not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching similar content data:", err);
    });
}

// Pemanggilan atau Calls function
fetchDetails();
fetchTrailer();
fetchCast();
fetchRecommendations();
fetchSimilar();