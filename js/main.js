
function display_movie(movies_list, cat_id) {
    let cat_images = document.getElementById(cat_id);
    cat_images.innerHTML = '';

    for (let i = 1; i < movies_list.length; i++) {

        let container = document.createElement('a');
        container.classList.add('image-container');

        let img = document.createElement('img');
        img.src = movies_list[i].image_url
        img.classList.add('movie_image');
        container.appendChild(img);

        img.onerror = function () {
            img.src = 'images/404.png';
        };

        let title = document.createElement('p');
        title.textContent = movies_list[i].title
        title.classList.add('image-title');
        container.appendChild(title);

        container.addEventListener('mouseenter', function () {
            title.classList.add('show-title');
        });

        container.addEventListener('click', function () {

            fetch(movies_list[i].url)
                .then(response => response.json())
                .then(details => {

                    console.log(details.image_url)
                    // affiche fenetre modale
                    var rectangle = document.getElementById('rectangle');
                    var display = rectangle.style.display;
                    rectangle.style.display = display === 'none' ? 'block' : 'none';

                    let details_img = document.getElementById('datails_img');
                    details_img.innerHTML = '';
                    let img = document.createElement('img');
                    img.src = details.image_url;
                    details_img.appendChild(img)

                    img.onerror = function () {
                        img.src = 'images/404.png';
                    };

                    // recupere div details et la clear
                    let details_container = document.getElementById('details_container');
                    details_container.innerHTML = '';

                    // charge datas
                    let details_title = document.createElement('h2');
                    details_title.textContent = details.title;
                    details_container.appendChild(details_title);

                    let details_directors = document.createElement('p');
                    details_directors.textContent = "Directed by : " + details.directors;
                    details_container.appendChild(details_directors);

                    let details_genres = document.createElement('p');
                    details_genres.textContent = details.genres;
                    details_container.appendChild(details_genres);

                    let details_year = document.createElement('p');
                    details_year.textContent = details.year + " - " + details.duration + "min";
                    details_container.appendChild(details_year);

                    let details_imdb = document.createElement('p');
                    details_imdb.textContent = "IMdb : " + details.imdb_score;
                    details_container.appendChild(details_imdb);

                    let details_actors = document.createElement('p');
                    details_actors.textContent = "Cast : " + details.actors;
                    details_container.appendChild(details_actors);

                    let details_countries = document.createElement('p');
                    details_countries.textContent = "Country : " + details.countries;
                    details_container.appendChild(details_countries);

                    let details_worldwide_gross_income = document.createElement('p');
                    details_worldwide_gross_income.textContent = "Worldwide gross : " + details.worldwide_gross_income;
                    details_container.appendChild(details_worldwide_gross_income);

                    let details_long_description = document.createElement('h4');
                    details_long_description.textContent = "Description : " + details.long_description;
                    details_container.appendChild(details_long_description);

                })


        });

        container.addEventListener('mouseleave', function () {
            title.classList.remove('show-title');
        });

        cat_images.appendChild(container);
    }
}

fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score')
    .then(response => response.json())
    .then(datas => {

        let best_movie = datas.results[0];
        //console.log(best_movie)
        let best = document.getElementById('best_movie');
        let img = document.createElement('img');
        img.src = best_movie.image_url
        img.classList.add('best_image');
        best.appendChild(img);

        fetch(best_movie.url)
            .then(response => response.json())
            .then(movie_datas => {

                let movie = movie_datas;
                //console.log(movie)
                let title = document.getElementById('best_title');
                title.textContent = movie.title
                let description = document.getElementById('best_description')
                description.textContent = movie.long_description

            })

    })

fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let movies_list = datas.results;
        display_movie(movies_list, 'best_cat0')

    })

fetch('http://localhost:8000/api/v1/titles/?genre=horror&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let horror_list = datas.results;
        display_movie(horror_list, 'best_cat1')

    })

fetch('http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let scifi_list = datas.results;
        display_movie(scifi_list, 'best_cat2')

    })

fetch('http://localhost:8000/api/v1/genres/?&page_size=30')
    .then(response => response.json())
    .then(datas => {
        let drama_list = datas.results;

        for (let i = 0; i < drama_list.length; i++) {

            let categories_list = document.getElementById('cat_menu');
            let categorie = document.createElement('a');

            categorie.textContent = drama_list[i].name
            let url = 'http://localhost:8000/api/v1/titles/?genre=' + drama_list[i].name + '&sort_by=-imdb_score&page_size=7'

            categorie.addEventListener('click', function () {

                let choosen_name = document.getElementById('choosen_name');
                choosen_name.textContent = drama_list[i].name

                fetch(url)
                    .then(response => response.json())
                    .then(datas => {
                        let choosen_list = datas.results;
                        display_movie(choosen_list, 'choosen_cat')
                    })

            })

            categories_list.appendChild(categorie);
        }
    })

fetch('http://localhost:8000/api/v1/titles/?genre=Crime&sort_by=-imdb_score&page_size=7')
    .then(response => response.json())
    .then(datas => {

        let crime_list = datas.results;
        display_movie(crime_list, 'choosen_cat')

    })


document.getElementById('toggle-rectangle').addEventListener('click', function () {
    var rectangle = document.getElementById('rectangle');
    var display = rectangle.style.display;
    rectangle.style.display = display === 'none' ? 'block' : 'none';
});

document.getElementById('close-rectangle').addEventListener('click', function (event) {
    var rectangle = document.getElementById('rectangle');
    rectangle.style.display = 'none';
    event.stopPropagation();
});