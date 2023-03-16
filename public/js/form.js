// form
let formBtn = document.querySelector('.submit-btn');
let loader = document.querySelector('.loader');
formBtn.addEventListener('click', () => {
let fullname = document.querySelector('#name');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let number = document.querySelector('#number');
let tac = document.querySelector('#tc');
// form validation
 if(fullname.value.length < 3){
    showFormError(' Name must be 3 letters long');
    } else if(!email.value ||!email.value.length){
    showFormError('enter your email');
    }else if(password.value.length < 8){
    showFormError('password must be 8 letters long');
    }else if(number.length < 10){
    showFormError('invalid number, please enter valid one');
    }
    else if(!tac.checked){
    showFormError('please accept the terms and conditions');
        }
    else{
        loader.style.display = 'block';
        sendData('/signup', {
        name: fullname.value,
        email: email.value,
        password: password.value,
        number: number.value,
        tac: tac.checked
        })
    }

})

