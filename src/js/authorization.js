import '../scss/app.scss';
import users from '../dummy_data/users.json';
console.log(users);

function homePage() {
    let homeBtn = document.querySelector('.header__home-page-button')
    homeBtn.onclick = function() {
        document.location.href = './index.html'
    }
}
homePage();
function registrationButton() {
    let regBtn = document.querySelector('.autorization-form__button-box__button-registration');
    regBtn.onclick = function() {
        document.location.href = './registration.html'
    }
}
registrationButton();
function cancelBtn() {
    let cancelBtn = document.querySelector('.autorization-form__button-box__button-cancel');
    cancelBtn.onclick = function() {
        document.location.href = './index.html'
    }
}
cancelBtn();

function authorization() {
    let logInBtn = document.querySelector('.autorization-form__button-box__button-log-in');
    let emailInput = document.querySelector('.autorization-form__input-box__input-email');
    let passwordInput = document.querySelector('.autorization-form__input-box__input-password');

    logInBtn.addEventListener('click', () => {
        if(emailInput.value == users[0].email || passwordInput.value == users[0].password) {
            document.location.href = './index.html';
            sessionStorage.clear();
            sessionStorage.setItem('isAdmin', 'true');
            
        }
    })
}
authorization()

