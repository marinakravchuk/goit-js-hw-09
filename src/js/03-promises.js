import Notiflix from 'notiflix';

const refs = {
  btn: document.querySelector('.form > button'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onBtnClick);

function onBtnClick(event) {
  event.preventDefault();
  const input = event.target.elements;

  const step = Number(input.step.value);
  const amount = Number(input.amount.value);
  let promiseDelay = Number(input.delay.value);

  Notiflix.Notify.info('Зараз буде черга Промісів');

  for (let position = 1; position <= amount; position++, promiseDelay += step) {
   console.log('position', position);
console.log('amount', amount);
console.log('promiseDelay', promiseDelay);
    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    });
  }
}
