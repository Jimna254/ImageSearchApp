// Store the API Key inside a variable
const accessKey = "OuUlXl_RNZtMwpAyLB1PKIdHcM5ljzjQgHIfQxZ4neI";
// Replace with your own API key

//Store important HTML elements inside variables

const formEl = document.querySelector("form");
const inputEl = document.getElementById("searchInput");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(params) {
  inputData = inputEl.ariaValueMax;
  // Dynamic URL
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}
  &client_id=${accessKey}`;

  //fetch the images Data
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  //Initialize the page number
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  // Map results variable
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = `${result.links.html}`;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
