import throttle from 'lodash.throttle';

const FEEDBACK_FROM_STATE = "feedback-form-state";
const THROTTLE_TIME = 500;

const form = document.querySelector('.feedback-form');

const {email, message} = form.elements;
const data = loadData();


function loadData() {

    try {
        return JSON.parse(localStorage.getItem(FEEDBACK_FROM_STATE)) || {};
    }
    catch (error) {
        console.log(`${error}`)
    }

}

if (data) {
    email.value = data.email || '';
    message.value = data.message || '';
}

function saveData(key, value) {

}

form.addEventListener('input', throttle(onInputForm, THROTTLE_TIME)) ||  {};
form.addEventListener('submit', onFormSubmit);

function onInputForm(event){

    saveData(event.target.name, event.target.value)

}

function onFormSubmit(event) {
    event.preventDefault();

    if(email.value === "" || message.value === "" ){
        return alert('Wypełnij pola');
    }

    console.log(data);

    localStorage.removeItem(FEEDBACK_FROM_STATE);
    event.currentTarget.reset();

}
function resetForm() {
    email.value = '';
    message.value = '';
    
    localStorage.removeItem(FEEDBACK_FROM_STATE);
}

form.addEventListener('reset', resetForm);
