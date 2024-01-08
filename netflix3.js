const apikey = "dd8641d463bbb1a484a563c704fb4ebc";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://api.themoviedb.org/3/movie/changes";
const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyC0SZJkHFX-fQ7NrsxdI4l4mGwYuY4l7P8`
}


function init() {
    fetchAndBuildAllSections();



}

function fetchAndBuildAllSections() {
    fetch(apiPaths.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => {
                    fetchAndbuildMovieSection(
                        apiPaths.fetchMoviesList(category.id),
                        category.name
                    );
                });


            }

            //console.table(movies)
        })

    .catch(err => console.log(err))

}

function fetchAndbuildMovieSection(fetchUrl, category) {
    console.log(fetchUrl, category);
    fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            // console.table(res.results);
            const movie = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies.slice(0, 6), category.name)
            }
        })
        .catch(err => console.log(err))

}

function buildMoviesSection(list, categoryName) {
    console.log(list, categoryName);

    const moviesCont = document.getElementById('movies-cont');

    const moviesListHTML = list.map(item => {
        return `
        <div class="movie-item" onmouseenter="searchMovieTrailer('${item.title}', 'yt${item.id}')">
            <img class="move-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
            <div class="iframe-wrap" id="yt${item.id}"></div>
        </div>`;
    }).join('');

    const moviesSectionHTML = `
        <h2 class="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></span></h2>
        <div class="movies-row">
            ${moviesListHTML}
        </div>
    `

    const div = document.createElement('div');
    div.className = "movies-section"
    div.innerHTML = moviesSectionHTML;

    // append html into movies container
    moviesCont.append(div);
}






window.addEventListener('load', function() {
    init();

})