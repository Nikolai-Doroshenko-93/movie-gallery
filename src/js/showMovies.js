import '../scss/app.scss';
export const moviesEl = document.querySelector('.movies__container');

function formatDate(date) {
    if(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
        
          var day = date.slice(8);
          var monthIndex = parseInt(date.slice(6,8));
          var year = date.slice(0,4);
        
          return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
  }

export function showMovies (data) {   
    data.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        
        movieEl.innerHTML = `

        <div class="movie__cover">
            <img 
            src="${'https://image.tmdb.org/t/p/w500' + movie.backdrop_path}"
            class="movie__cover__img">
            </img>
            <div class="movie__cover-blackout">    
            </div>
            <div class="movie__cover-blackout__movie-id">${movie.id}</div>
            <div class="movie__info__popularity-and-release-date">
            
                <div class="movie__info__popularity">
                    <div class="movie__info__popularity__icon"></div>
                    <p>${Math.round(movie.vote_count)}</p>
                    
                </div>
                <div class="movie__info__release-date">Release date: <br> ${formatDate(movie.release_date)}</div>
            </div>
        </div>
        <div class="movie__info__title">${movie.title}</div>
        <div class="movie__delete-btn"></div>
        `;
        moviesEl.appendChild(movieEl);
    });

    //DELETE MOVIE

    function delMovie () {
        let delBtnArr = document.querySelectorAll('.movie__delete-btn'); 
        for(let i = 0; i<delBtnArr.length; i++) {
            delBtnArr[i].addEventListener('click', () => {
                let delMovie = delBtnArr[i].closest('.movie');

                let modalWindow = document.querySelector('.modal-window-for-delete-movie');
                let modalWindowCurrentMovieImg = document.querySelector('.modal-window-for-delete-movie__current-movie-img');
                let modalWindowCurrentMovieTitle = document.querySelector('.modal-window-for-delete-movie__current-movie-title');

                let modalWindowYes = document.querySelector('.modal-window-for-delete-movie__btn-yes');
                let modalWindowCancel = document.querySelector('.modal-window-for-delete-movie__btn-cancel');
                let bodyOverlay = document.querySelector('.body__overlay');

                let currentMovieImg = delMovie.querySelector('.movie__cover__img');              
                let currentMovieTitle = delMovie.querySelector('.movie__info__title');
                let copyCurrentMovieImg = currentMovieImg.cloneNode(true);
                let copyCurrentMovieTitle = currentMovieTitle.cloneNode(true);

                modalWindow.style.display = 'block';
                bodyOverlay.style.display = 'block';

                modalWindowCurrentMovieImg.innerHTML = '';
                modalWindowCurrentMovieTitle.innerHTML = '';
                modalWindowCurrentMovieImg.appendChild(copyCurrentMovieImg);
                modalWindowCurrentMovieTitle.appendChild(copyCurrentMovieTitle);

                modalWindowYes.addEventListener('click', () => {
                    modalWindow.style.display = 'none';
                    bodyOverlay.style.display = 'none';
                    delMovie.style.display = 'none';
                })
                modalWindowCancel.addEventListener('click', () => {
                    modalWindow.style.display = 'none';
                    bodyOverlay.style.display = 'none';
                })
                bodyOverlay.addEventListener('click', () => {
                    modalWindow.style.display = 'none'
                    bodyOverlay.style.display = 'none';
                })
            })
        }
    }
    delMovie ()

    //FOR ADMIN

    function forAdmin() {
        let delBtnArr = document.querySelectorAll('.movie__delete-btn'); 
        let isAdmin = sessionStorage.getItem('isAdmin');
        if(isAdmin == 'true') {
            for (let i = 0; i<delBtnArr.length; i++) {
                delBtnArr[i].style.display = "block"
            }
            let signInBtn = document.querySelector('.header__sign-button');
            let logOutBtn = document.querySelector('.header__log-out-button');

            signInBtn.style.display = 'none';
            logOutBtn.style.display = 'block';

            let userName = document.querySelector('.header__user-name');
            userName.innerHTML = 'Admin';


            logOutBtn.addEventListener('click', () => {
                sessionStorage.clear();
                sessionStorage.getItem('isGuest', 'true');
                document.location.href = './index.html';
            })
        }
    } 
    forAdmin();


    //MOVIE PAGE

    function moviePage () {
        
        function adult(element) {
            let adultValue;
            if (element == true) {
                adultValue = 'Yes'
            } else {
                adultValue = ' Not' 
            }
            return adultValue;
        }

        let movieCover = document.querySelectorAll('.movie__cover');
        movieCover.forEach(element => {
            element.addEventListener('click', () => {
                let currentDivArr = element.children;
                let currentId = parseInt(currentDivArr[2].innerHTML);
                let currentMovie = data.find(movie => movie.id === currentId);
                let pageMovie = document.createElement('div');

                pageMovie.classList.add('modal-window-for-movie-page');
                pageMovie.innerHTML = `
                <div class="modal-window-for-movie-page">
                    <div class="modal-window-for-movie-page__back-btn">
                        Back
                    </div>
                    <div class="modal-window-for-movie-page__box-img">
                        <img 
                            src="${'https://image.tmdb.org/t/p/w500' + currentMovie.backdrop_path}"
                            class="modal-window-for-movie-page__box-img__img">
                        </img>
                    </div>
                    <div class="modal-window-for-movie-page__box-info">
                        <div class="modal-window-for-movie-page__box-info__title">
                            <strong>${currentMovie.title}</strong>
                        </div>
                        <div class="modal-window-for-movie-page__release-date">
                            <strong>Release date:</strong>
                            ${formatDate(currentMovie.release_date)}
                        </div>
                        <div class="modal-window-for-movie-page__box-info__rating">
                            <strong>Rating:</strong> 
                            ${currentMovie.vote_average}
                        </div>
                        <div class="modal-window-for-movie-page__box-info__likes">
                            <strong>Likes:</strong> 
                            ${currentMovie.vote_count}
                        </div>
                        <div class="modal-window-for-movie-page__box-info__adult">
                            <strong>Adult:</strong> 
                            ${adult(currentMovie.adult)}
                        </div>
                    </div>
                </div>
                <div class="modal-window-for-movie-page__overview">
                    <p>${currentMovie.overview}</p>
                </div>
                `
                let scrollValue = scrollY;

                let body = document.querySelector('.body');
                body.scrollIntoView();
                moviesEl.appendChild(pageMovie);
                moviesEl.classList.add('movies__container__movie-page-is-active');

                let paginationBox = document.querySelector('.pagination');
                paginationBox.style.display = 'none';

                let selectOfHeader = document.querySelector('.header__select');
                selectOfHeader.style.display = 'none';
                function moviePageBackBtn () {
                    let backBtn = pageMovie.querySelector('.modal-window-for-movie-page__back-btn');
                    backBtn.addEventListener('click', () => {
                        paginationBox.style.display = 'flex';
                        selectOfHeader.style.display = 'block';
                        pageMovie.remove();
                        moviesEl.classList.remove('movies__container__movie-page-is-active');  
                        scroll(0, scrollValue);
                    })
                }
                moviePageBackBtn ();
            })
        })

    }
    moviePage ();
}