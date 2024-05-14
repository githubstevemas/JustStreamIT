// With movie datas, get modal movie image.
function displayImgModal(details) {
    var modal = document.getElementById('modal');
    var display = modal.style.display;
    modal.style.display = display === 'none' ? 'block' : 'none';

    let detailsImg = document.getElementById('details-img');
    detailsImg.innerHTML = '';
    let img = document.createElement('img');
    img.src = details.image_url;

    detailsImg.appendChild(img);

    img.onerror = function () {
        img.src = 'images/404.png';
    };
}

// With movie datas, get all details information for modal window.
function displayModalDetails(details) {
    let detailsContainer = document.getElementById('details-text');
    detailsContainer.innerHTML = '';

    let detailsTitle = document.createElement('h3');
    detailsTitle.textContent = details.title;
    detailsContainer.appendChild(detailsTitle);

    let detailsGenres = document.createElement('p');
    detailsGenres.textContent = details.genres;
    detailsContainer.appendChild(detailsGenres);

    let detailsYear = document.createElement('p');
    detailsYear.textContent = `${details.year} - ${details.duration}min`;
    detailsContainer.appendChild(detailsYear);

    let detailsImdb = document.createElement('p');
    detailsImdb.innerHTML = `<img src='images/imdb.png' alt='imdb logo' style='width: 30px; height: auto;'> ${details.imdb_score} - Box office ($) : ${details.worldwide_gross_income}`;
    detailsContainer.appendChild(detailsImdb);

    let detailsDirectors = document.createElement('p');
    detailsDirectors.innerHTML = `<span style='font-weight: bold'>Directed by :</span> ${details.directors.join(', ')} (${details.countries})`;
    detailsContainer.appendChild(detailsDirectors);

    let detailsActors = document.createElement('p');
    detailsActors.innerHTML = `<span style='font-weight: bold'>Cast :</span> ${details.actors.join(', ')}`;
    detailsContainer.appendChild(detailsActors);

    let detailsDescription = document.createElement('p');
    detailsDescription.innerHTML = `<span style='font-weight: bold'>Description :</span> ${details.long_description}`;
    detailsContainer.appendChild(detailsDescription);
}

// With list of movies and category container, display all movies
function displayCategoriesMovies(moviesList, catId) {
    let catImages = document.getElementById(catId);
    catImages.innerHTML = '';

    for (let i = 1; i < moviesList.length; i++) {
        let container = document.createElement('a');
        container.classList.add('movie-container');

        let img = document.createElement('img');
        img.src = moviesList[i].image_url;
        img.classList.add('movie-image');
        container.appendChild(img);
        img.onerror = function () {
            img.src = 'images/404.png';
        };

        let title = document.createElement('p');
        title.textContent = moviesList[i].title;
        title.classList.add('image-title');
        container.appendChild(title);

        container.addEventListener('click', function () {
            fetch(moviesList[i].url)
                .then(response => response.json())
                .then(details => {
                    displayImgModal(details);
                    displayModalDetails(details);
                });
        });

        catImages.appendChild(container);
    }
}

// Display best-movie container datas
fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score')
    .then(response => response.json())
    .then(datas => {
        let bestMovie = datas.results[0];
        let best = document.getElementById('best-movie');
        let img = document.createElement('img');
        img.src = bestMovie.image_url;
        img.classList.add('best-image');
        best.appendChild(img);

        fetch(bestMovie.url)
            .then(response => response.json())
            .then(movieDatas => {
                let movie = movieDatas;
                let title = document.getElementById('best-title');
                title.textContent = movie.title;
                let description = document.getElementById('best-description');
                description.textContent = movie.long_description;
            });
    });

// Display best-cat0 container datas
fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {
        let moviesList = datas.results;
        displayCategoriesMovies(moviesList, 'best-cat0');
    });

// Display best-cat1 container datas
fetch('http://localhost:8000/api/v1/titles/?genre=horror&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {
        let horrorList = datas.results;
        displayCategoriesMovies(horrorList, 'best-cat1');
    });

// Display best-cat2 container datas
fetch('http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {
        let scifiList = datas.results;
        displayCategoriesMovies(scifiList, 'best-cat2');
    });

// Display all categories name for cat-menu container
fetch('http://localhost:8000/api/v1/genres/?&page_size=30')
    .then(response => response.json())
    .then(datas => {
        let dramaList = datas.results;

        for (let i = 0; i < dramaList.length; i++) {
            let categoriesList = document.getElementById('cat-menu');
            let categorie = document.createElement('a');

            categorie.textContent = dramaList[i].name;
            let url = `http://localhost:8000/api/v1/titles/?genre=${dramaList[i].name}&sort_by=-imdb_score&page_size=7`;

            categorie.addEventListener('click', function () {
                let choosenName = document.getElementById('choosen-name');
                choosenName.textContent = dramaList[i].name;

                fetch(url)
                    .then(response => response.json())
                    .then(datas => {
                        let choosenList = datas.results;
                        displayCategoriesMovies(choosenList, 'best-cat3');
                    });
            });

            categoriesList.appendChild(categorie);
        }
    });

// Display best-cat3 container datas
fetch('http://localhost:8000/api/v1/titles/?genre=Crime&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {
        let crimeList = datas.results;
        displayCategoriesMovies(crimeList, 'best-cat3');
    });

// Modal window management
document.getElementById('toggle-modal').addEventListener('click', function () {
    var modal = document.getElementById('modal');
    var display = modal.style.display;
    modal.style.display = display === 'none' ? 'block' : 'none';
});

document.getElementById('close-modal').addEventListener('click', function (event) {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    event.stopPropagation();
});

// Show more or less management
function toggleVisibility(event) {
    const button = event.currentTarget;
    const targetSelector = button.getAttribute('data-target');
    const container = document.querySelector(targetSelector);
    const isShowingAll = container.classList.toggle('show-all');
    button.textContent = isShowingAll ? 'Voir moins' : 'Voir plus';
}

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', toggleVisibility);
});
