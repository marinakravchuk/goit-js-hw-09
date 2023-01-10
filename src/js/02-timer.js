import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import timeConverter from './convertMStoTime';

let selectedTime = 0;

const selector = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date().now > selectedDates[0].getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    } 
      btnStart.disabled = false;
      selectedTime = selectedDates[0].getTime();
    
    },
};

const fp = flatpickr(selector, options);

const btnStart = document.querySelector('button[data-start]');
const timerDaysRef = document.querySelector('span[data-days]');
const timerHoursRef = document.querySelector('span[data-Hours]');
const timerMinsRef = document.querySelector('span[data-minutes]');
const timerSecsRef = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

function addZero(num) {
  let value = num + ''; /*  String(num) ; num.toString()   */
  if (value.length === 1) {
    value = '0' + value;
  }
  return value;
}

btnStart.addEventListener('click', backTimer);

function backTimer() {
  Notiflix.Notify.success('Timer started');
  btnStart.disabled = true;

  const intervalID = setInterval(() => {
    let timeLeft = selectedTime - Date.now();
    if (timeLeft < 0) {
      clearInterval(intervalID);
      Notiflix.Notify.info('TIME IS OUT');
      return;
    } 
      chageTimeInHTML(timeLeft);
    
  }, 1000);
/*   console.log(selectedTime);
  console.log(Date.now()) */
}

function chageTimeInHTML(timeLeft) {
  const { days, hours, minutes, seconds } = timeConverter(timeLeft);

  timerDaysRef.textContent = addZero(days);
  timerHoursRef.textContent = addZero(hours);
  timerMinsRef.textContent = addZero(minutes);
  timerSecsRef.textContent = addZero(seconds);
}
