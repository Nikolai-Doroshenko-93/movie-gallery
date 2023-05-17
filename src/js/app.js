import '../scss/app.scss';
import {showMovies} from './showMovies';
import {moviesEl} from './showMovies';

/* Your JS Code goes here */
let movieArr = [];

const requestURL = 'https://kinobd.ru/api/films';

function addMovieInArr() {
    for (let i=1; i<=15; i++) {
        getMovies(requestURL+i);
    }
    console.log(movieArr)
}
addMovieInArr();
async function getMovies(url) {
    let resp = await fetch(url);
    let respData = await resp.json();
    for (let i = 0; i<respData.results.length; i++) {
        movieArr.push(respData.results[i]);
    } 
    console.log(movieArr)
}
async function firstPageMovies(url) {
    let resp = await fetch(url);
    let respData = await resp.json();
    showMovies(respData.results);
}
firstPageMovies(requestURL+1);

console.log(movieArr);
select();
moviePagination();
//HOMEPAGE 
function homePage() {
    let homeBtn = document.querySelector('.header__home-page-button')
    homeBtn.onclick = function() {
        document.location.href = "./index.html"
    }
}
homePage();
//PAGINATION
function moviePagination() {


    let numbersOfButtons = movieArr.length/20;
    console.log(numbersOfButtons);

    let currentPage = 1;
    let item = document.querySelectorAll(".pagination__ul__li");
    let notesOnPage = 20;
    for (let i=0; i<item.length; i++) {
        item[i].addEventListener('click', function () {
            let pageNum = +this.innerHTML;
            let start = (pageNum - 1) * notesOnPage;
            let end = start + notesOnPage;
            let currentShowMovie = movieArr.slice(start, end);

            moviesEl.innerHTML = "";
            showMovies (currentShowMovie);
            currentPagination();
            currentPage = parseInt(item[i].innerHTML);
            moviesEl.scrollIntoView();

            function currentPagination() {
                for(let i=0; i<item.length; i++) {
                    item[i].classList.remove('pagination__ul__current');
                }
                item[i].classList.add('pagination__ul__current');
    
                for(let i=0; i<item.length; i++) {
                    item[i].style.display = 'none';
                }
                if(i == 1) {
                    item[i+3].style.display = 'flex';
                }
                if(i == 0) {
                    item[i+3].style.display = 'flex';
                    item[i+4].style.display = 'flex';
                }
                if(item[i+2]) {
                    item[i+2].style.display = 'flex';
                }
                if(item[i+1]) {
                    item[i+1].style.display = 'flex'
                }
                if(item[i]) {
                    item[i].style.display = 'flex'
                }
                if(item[i-1]) {
                    item[i-1].style.display = 'flex'
                }
                if(item[i-2]) {
                    item[i-2].style.display = 'flex'
                }
            }

        });
    }
    function btnFirstPage() {
        let btnFirst = document.querySelector('.pagination__btn-first');
        btnFirst.addEventListener('click', () => {
            let currentShowMovie = movieArr.slice(0, 20);
            moviesEl.innerHTML = "";
            showMovies (currentShowMovie);
            moviesEl.scrollIntoView();

            for(let i=0; i<item.length; i++) {
                item[i].classList.remove('pagination__ul__current');
            }
            for(let i=0; i<item.length; i++) {
                item[i].style.display = 'none';
            }
            // item[0].style.display = 'flex';
            item[0].classList.add('pagination__ul__current');
            let itemSlice = Array.from(item).slice(0, 5);
                itemSlice.forEach((e) => e.style.display = 'flex');
            // item[1].style.display = 'flex';
            // item[2].style.display = 'flex';
            // item[3].style.display = 'flex';
            // item[4].style.display = 'flex';
            currentPage = 1;
        })
    }
    function btnLastPage() {
        let btnLast = document.querySelector('.pagination__btn-last');
        btnLast.addEventListener('click', () => {
            let currentShowMovie = movieArr.slice((item.length-1)*20, (item.length-1)*20+20);
            moviesEl.innerHTML = "";
            showMovies (currentShowMovie);
            moviesEl.scrollIntoView();
            let k = item.length-1;
            for(let i=0; i<item.length; i++) {
                item[i].classList.remove('pagination__ul__current');
            }
            for(let i=0; i<item.length; i++) {
                item[i].style.display = 'none';
            }
            let itemSlice = Array.from(item).slice(k-2, k+1);
                    itemSlice.forEach((e) => e.style.display = 'flex');
            // item[k].style.display = 'flex';
            item[k].classList.add('pagination__ul__current');
            // item[k-1].style.display = 'flex';
            // item[k-2].style.display = 'flex';
            currentPage = k+1;
        })
    }
    function btnNextPage() {
        let btnNext = document.querySelector('.pagination__btn-next');

        btnNext.addEventListener('click' , () => {
            if(currentPage<15) {
                currentPage = +currentPage+1;
                let start = (currentPage - 1) * notesOnPage;
                let end = start + notesOnPage;
                let currentShowMovie = movieArr.slice(start, end);
                moviesEl.innerHTML = "";
                showMovies (currentShowMovie);
                moviesEl.scrollIntoView();
                
                let currentPaginationItem = currentPage-1;
                for(let i=0; i<item.length; i++) {
                    item[i].classList.remove('pagination__ul__current');
                }
                for(let i=0; i<item.length; i++) {
                    item[i].style.display = 'none';
                }
                item[currentPaginationItem].classList.add('pagination__ul__current');
                item[currentPaginationItem].style.display = 'flex';  
                if(currentPaginationItem == 0) {
                    let itemSlice = Array.from(item).slice(currentPaginationItem, currentPaginationItem+5);
                    itemSlice.forEach((e) => e.style.display = 'flex');
                    // item[currentPaginationItem].style.display = 'flex';
                    // item[currentPaginationItem+1].style.display = 'flex';
                    // item[currentPaginationItem+2].style.display = 'flex';
                    // item[currentPaginationItem+3].style.display = 'flex';
                    // item[currentPaginationItem+4].style.display = 'flex';
                } 
                if(currentPaginationItem == 1) {
                    let itemSlice = Array.from(item).slice(currentPaginationItem-1, currentPaginationItem+4);
                    itemSlice.forEach((e) => e.style.display = 'flex');
                    // item[currentPaginationItem-1].style.display = 'flex';
                    // item[currentPaginationItem].style.display = 'flex';
                    // item[currentPaginationItem+1].style.display = 'flex';
                    // item[currentPaginationItem+2].style.display = 'flex';
                    // item[currentPaginationItem+3].style.display = 'flex';
                }
                if(currentPaginationItem > 1) {
                    let itemSlice = Array.from(item).slice(currentPaginationItem-2, currentPaginationItem+1);
                    itemSlice.forEach((e) => e.style.display = 'flex');
                    // item[currentPaginationItem-2].style.display = 'flex';
                    // item[currentPaginationItem-1].style.display = 'flex';
                    // item[currentPaginationItem].style.display = 'flex';
                    if(item[currentPaginationItem+1]) {
                        item[currentPaginationItem+1].style.display = 'flex';
                    }
                    if(item[currentPaginationItem+2]) {
                        item[currentPaginationItem+2].style.display = 'flex';
                    }   
                }
            }
           
        })   
    }
    function btnPreviosPage() {
        let btnPrevios = document.querySelector('.pagination__btn-previos');

        btnPrevios.addEventListener('click' , () => {
            if(currentPage>1) {
                currentPage = +currentPage-1;
                let start = (currentPage - 1) * notesOnPage;
                let end = start + notesOnPage;
                let currentShowMovie = movieArr.slice(start, end);
                moviesEl.innerHTML = "";
                showMovies (currentShowMovie);
                moviesEl.scrollIntoView();
                
                let currentPaginationItem = currentPage-1;
                for(let i=0; i<item.length; i++) {
                    item[i].classList.remove('pagination__ul__current');
                }
                for(let i=0; i<item.length; i++) {
                    item[i].style.display = 'none';
                }
                item[currentPaginationItem].classList.add('pagination__ul__current');
                item[currentPaginationItem].style.display = 'flex';  
                if(currentPaginationItem == 0) {  
                    let itemSlice = Array.from(item).slice(currentPaginationItem, currentPaginationItem+5);
                    itemSlice.forEach((e) => e.style.display = 'flex');
                } 
                if(currentPaginationItem == 1) {
                    let itemSlice = Array.from(item).slice(currentPaginationItem-1, currentPaginationItem+4);
                    itemSlice.forEach((e) => e.style.display = 'flex');
                    // item[currentPaginationItem-1].style.display = 'flex';
                    // item[currentPaginationItem].style.display = 'flex';
                    // item[currentPaginationItem+1].style.display = 'flex';
                    // item[currentPaginationItem+2].style.display = 'flex';
                    // item[currentPaginationItem+3].style.display = 'flex';
                }
                if(currentPaginationItem > 1) {
                    let itemSlice = Array.from(item).slice(currentPaginationItem-2, currentPaginationItem+1);
                    itemSlice.forEach((e) => e.style.display = 'flex');
                    // item[currentPaginationItem-2].style.display = 'flex';
                    // item[currentPaginationItem-1].style.display = 'flex';
                    // item[currentPaginationItem].style.display = 'flex';
                    if(item[currentPaginationItem+1]) {
                        item[currentPaginationItem+1].style.display = 'flex';
                    }
                    if(item[currentPaginationItem+2]) {
                        item[currentPaginationItem+2].style.display = 'flex';
                    }    
                }
            }
           
        })
    }
    btnFirstPage();
    btnLastPage();
    btnNextPage();
    btnPreviosPage();
}

//SORT
function sortByPopularityDown() {
    movieArr = movieArr.sort((a, b) => a.vote_count > b.vote_count ? 1 : -1);
    moviesEl.innerHTML = '';
    showMovies(movieArr.slice(0,20));
    let items = document.querySelectorAll(".pagination li");
    for(let i=0; i<items.length; i++) {
        items[i].classList.remove('pagination__current');
    }
    items[0].classList.add('pagination__current');
}
function sortByPopularityUp() {
    movieArr = movieArr.sort((a, b) => a.vote_count > b.vote_count ? 1 : -1);
    movieArr = movieArr.reverse();
    moviesEl.innerHTML = '';
    showMovies(movieArr.slice(0,20));
    let items = document.querySelectorAll(".pagination li");
    for(let i=0; i<items.length; i++) {
        items[i].classList.remove('pagination__current');
    }
    items[0].classList.add('pagination__current');
}
function sortByReleaseDateDown() {
    movieArr = movieArr.sort((a, b) => new Date (a.release_date) - new Date (b.release_date));
    moviesEl.innerHTML = '';
    showMovies(movieArr.slice(0,20));
    let items = document.querySelectorAll(".pagination li");
    for(let i=0; i<items.length; i++) {
        items[i].classList.remove('pagination__current');
    }
    items[0].classList.add('pagination__current');
}
function sortByReleaseDateUp() {
    movieArr = movieArr.sort((a, b) => new Date (a.release_date) - new Date (b.release_date));
    movieArr = movieArr.reverse();
    moviesEl.innerHTML = '';
    showMovies(movieArr.slice(0,20));
    let items = document.querySelectorAll(".pagination li");
    for(let i=0; i<items.length; i++) {
        items[i].classList.remove('pagination__current');
    }
    items[0].classList.add('pagination__current');
}

//SELECT
function select() {
    let selectHeader = document.querySelectorAll('.header__select__header')
    let selectItem = document.querySelectorAll('.header__select__body__item')

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    })
    function selectToggle() {
        this.parentElement.classList.toggle('select-is-active')
    };
    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.header__select'),
            currentText = select.querySelector('.header__select__header__current-item');
        currentText.innerText = text;
        select.classList.remove('select-is-active');
    }
    let selectSortByPopularityDown = document.getElementById('sort-by-popularity-down'),
    selectSortByPopularityUp  = document.getElementById('sort-by-popularity-up'),
    selectSortByDateReleaseDown  = document.getElementById('sort-by-date-release-down'),
    selectSortByDateReleaseUp  = document.getElementById('sort-by-date-release-up');

    selectSortByPopularityDown.addEventListener('click', sortByPopularityDown);
    selectSortByPopularityUp.addEventListener('click', sortByPopularityUp);
    selectSortByDateReleaseDown.addEventListener('click', sortByReleaseDateDown);
    selectSortByDateReleaseUp.addEventListener('click', sortByReleaseDateUp);

}

//AUTORIZATION BUTTON
function getAuthForm() {
    let sigInBtn = document.querySelector('.header__sign-button');
    sigInBtn.onclick = function() {
        document.location.href = "./authorization.html";
    };
}
getAuthForm();

//DELETE MOVIE








