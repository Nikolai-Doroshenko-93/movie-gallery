import '../scss/app.scss';
function homePage() {
    let homeBtn = document.querySelector('.header__home-page-button')
    homeBtn.onclick = function() {
        document.location.href = './index.html'
    }
}
homePage();
function backBtn() {
    let backBtn = document.querySelector('.registration-form__button-box__button-cancel');
    backBtn.onclick = function() {
        document.location.href = './authorization.html'
    }
}
backBtn();