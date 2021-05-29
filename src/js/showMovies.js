import '../scss/app.scss';
export const moviesEl = document.querySelector('.movies__container');

export function showMovies (data) {   
    data.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
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
        movieEl.innerHTML = `

        <div class="movie__cover">
            <img 
            src="${'https://image.tmdb.org/t/p/w500' + movie.backdrop_path}"
            class="movie__cover__img">
            </img>
            <div class="movie__cover-blackout"></div>
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
}