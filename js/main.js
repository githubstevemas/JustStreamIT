function display_modal(details) {

    var modal = document.getElementById('modal');
    var display = modal.style.display;
    modal.style.display = display === 'none' ? 'block' : 'none';

    let details_img = document.getElementById('details-img');
    details_img.innerHTML = '';
    let img = document.createElement('img');
    img.src = details.image_url;
    
    details_img.appendChild(img);

    img.onerror = function () {
        img.src = 'images/404.png';
    }
};
    
function display_details(details) {

    let details_container = document.getElementById('details-text');
    details_container.innerHTML = '';

    let details_title = document.createElement('h3');
    details_title.textContent = details.title;
    details_container.appendChild(details_title);

    let details_genres = document.createElement('p');
    details_genres.textContent = details.genres;
    details_container.appendChild(details_genres);

    let details_year = document.createElement('p');
    details_year.textContent = details.year + " - " + details.duration + "min";
    details_container.appendChild(details_year);

    let details_imdb = document.createElement('p');
    details_imdb.innerHTML = "<img src='images/imdb.png' alt='imdb logo' style='width: 30px; height: auto;'> " + " " + details.imdb_score + " - " + " Box office ($) : " + details.worldwide_gross_income;
    details_container.appendChild(details_imdb);

    let details_directors = document.createElement('p');
    details_directors.innerHTML = "<span style='font-weight: bold'>Directed by :</span> " + details.directors.join(', ') + " " + "( " + details.countries + " )";
    details_container.appendChild(details_directors);

    let details_actors = document.createElement('p');
    details_actors.innerHTML = "<span style='font-weight: bold'>Cast :</span> " + details.actors.join(', ');
    details_container.appendChild(details_actors);

    let details_description = document.createElement('p');
    details_description.innerHTML = "<span style='font-weight: bold'>Description :</span> " + details.long_description;
    details_container.appendChild(details_description);
};


function display_movie(movies_list, cat_id) {

    let cat_images = document.getElementById(cat_id);
    cat_images.innerHTML = '';

    for (let i = 1; i < movies_list.length; i++) {

        let container = document.createElement('a');
        container.classList.add('movie-container');

        let img = document.createElement('img');
        img.src = movies_list[i].image_url;
        img.classList.add('movie-image');
        container.appendChild(img);

        img.onerror = function () {
            img.src = 'images/404.png';
        };

        let title = document.createElement('p');
        title.textContent = movies_list[i].title
        title.classList.add('image-title');
        container.appendChild(title);

        container.addEventListener('click', function () {

            fetch(movies_list[i].url)
                .then(response => response.json())
                .then(details => {

                    display_modal(details);
                    display_details(details);
                })
        });

        img.addEventListener('mouseleave', function () {
            title.classList.remove('show-title');
        });

        cat_images.appendChild(container);
    }
};

fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score')
    .then(response => response.json())
    .then(datas => {

        let best_movie = datas.results[0];
        //console.log(best_movie);
        let best = document.getElementById('best-movie');
        let img = document.createElement('img');
        img.src = best_movie.image_url;
        img.classList.add('best-image');
        best.appendChild(img);

        fetch(best_movie.url)
            .then(response => response.json())
            .then(movie_datas => {

                let movie = movie_datas;
                //console.log(movie);
                let title = document.getElementById('best-title');
                title.textContent = movie.title;
                let description = document.getElementById('best-description');
                description.textContent = movie.long_description;
            })
    })

fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let movies_list = datas.results;
        display_movie(movies_list, 'best-cat0');
    })

fetch('http://localhost:8000/api/v1/titles/?genre=horror&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let horror_list = datas.results;
        display_movie(horror_list, 'best-cat1');
    })

fetch('http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let scifi_list = datas.results;
        display_movie(scifi_list, 'best-cat2');
    })

fetch('http://localhost:8000/api/v1/genres/?&page_size=30')
    .then(response => response.json())
    .then(datas => {
        let drama_list = datas.results;

        for (let i = 0; i < drama_list.length; i++) {

            let categories_list = document.getElementById('cat-menu');
            let categorie = document.createElement('a');

            categorie.textContent = drama_list[i].name
            let url = 'http://localhost:8000/api/v1/titles/?genre=' + drama_list[i].name + '&sort_by=-imdb_score&page_size=7';

            categorie.addEventListener('click', function () {

                let choosen_name = document.getElementById('choosen-name');
                choosen_name.textContent = drama_list[i].name;

                fetch(url)
                    .then(response => response.json())
                    .then(datas => {
                        let choosen_list = datas.results;
                        display_movie(choosen_list, 'best-cat3');
                    })
            })

            categories_list.appendChild(categorie);
        }
    });

fetch('http://localhost:8000/api/v1/titles/?genre=Crime&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let crime_list = datas.results;
        display_movie(crime_list, 'best-cat3');
    });


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
