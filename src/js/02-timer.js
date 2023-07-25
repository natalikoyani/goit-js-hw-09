import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

console.log(dateInput);

startBtn.setAttribute('disabled', '');

dateInput.addEventListener('click', chooseDateHandler);
startBtn.addEventListener('click', startTimerHandler);



function chooseDateHandler() {

}
