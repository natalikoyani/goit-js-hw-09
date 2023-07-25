import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');
let selectedDate;
let timerId;



startBtn.setAttribute('disabled', '');

const fp = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if(selectedDate < new Date()){
            Notify.warning("Please choose a date in the future");
        } else {
            startBtn.removeAttribute('disabled');
        }
    },
});

startBtn.addEventListener('click', startTimerHandler);

function startTimerHandler() {
    timerId = setInterval(timerCounter, 1000);
}

function timerCounter() {
    startBtn.setAttribute('disabled', '');

    const leftTime = selectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(leftTime);

    daysLeft.textContent = addLeadingZero(days);
    hoursLeft.textContent = addLeadingZero(hours);
    minutesLeft.textContent = addLeadingZero(minutes);
    secondsLeft.textContent = addLeadingZero(seconds);

    if (leftTime <= 0) {
        clearInterval(timerId);
        daysLeft.textContent = '00';
        hoursLeft.textContent = '00';
        minutesLeft.textContent = '00';
        secondsLeft.textContent = '00';
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
    }

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}