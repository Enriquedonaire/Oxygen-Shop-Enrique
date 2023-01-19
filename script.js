const modalPopUp = document.querySelector('#newsletter__bg');

let nameValidation = false;
let emailValidation = false;

let intText = document.querySelector(" input[name='name-person']");
let intMail = document.querySelector(" input[name='email']");
let intCheck = document.querySelector(" input[name='data-protection']");

let btn = document.querySelector('#submit-btn');

btn.disabled = true;
btn.style.background = 'grey';

sessionStorage.setItem('value', '1');


let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


document.querySelector("div.btn__scroll_up").addEventListener('click', () => {
  setTimeout(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, 200)

})


window.onscroll = function () {
  let longitud = 0;

  longitud = Math.round(100 * (window.scrollY) / (document.body.clientHeight - window.innerHeight))
  document.querySelector('.percentage-scroller').style.width = `${longitud}%`;

  if (longitud == 25 && sessionStorage.getItem('value') == 1) {
    modalPopUp.style.display = 'block';

  }

};


setTimeout(function () {
  if (sessionStorage.getItem('value') == 1) {
    modalPopUp.style.display = 'block';

    const btn_modalPopUp = document.querySelector('.newsletter__btn');
    const mail = document.querySelector('.info__newsletter__input');

    btn_modalPopUp.addEventListener('click', (e) => {
      e.preventDefault();

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          Name: mail,
        }),

        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

      alert('Su Solicitud ha sido Enviada.')

      document.querySelector('.form').reset();

    })
  }

}, 5000);

// const btn_OpenShop = document.querySelector('.header__info__btn btn-primary');
// btn_OpenShop.addEventListener('click', (e) => {
//   e.preventDefault()
//   modalPopUp.style.display = 'block';

intText.addEventListener('input', (event) => {

  if (event.target.value.length < 2 || event.target.value.length > 100) {
    nameValidation = false;
    intText.style.borderBottom = `2px solid #FB3B64`;
    habilitarBoton();

  } else if (event.target.value.length === 0) {
    intText.style.borderBottom = `1px solid #95989a`;
    nameValidation = false;
    habilitarBoton();

  } else {
    intText.style.borderBottom = `2px solid #08A6E4`;
    nameValidation = true;
    habilitarBoton();
  }
})

intMail.addEventListener('input', (event) => {

  if (emailRegex.test(event.target.value)) {
    emailValidation = true;
    intMail.style.borderBottom = `2px solid #08A6E4`;
    habilitarBoton();

  } else if (intMail.value.length === 0) {
    intMail.style.borderBottom = `1px solid #95989a`;
    emailValidation = false;
    habilitarBoton();
  } else {
    intMail.style.borderBottom = `2px solid #FB3B64`;
    emailValidation = false;
    habilitarBoton();
  }
});

intCheck.addEventListener('input', () => {
  habilitarBoton();
})

btn.addEventListener('click', (e) => {

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      Name: intText.value,
      Mail: intMail.value,
    }),

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  alert('Su Solicitud ha sido Enviada.')

  operationButton('in-activo');
  document.querySelector('.form').reset();

  e.preventDefault();

})

function habilitarBoton() {

  if (nameValidation === true && emailValidation === true && intCheck.checked === true) {
    operationButton('activo');
  } else {
    operationButton('in-activo');
  }

}

function operationButton(position) {
  if (position === 'activo') {
    btn.disabled = false;
    btn.style.background = '#08A6E4';
  } else {
    btn.disabled = true;
    btn.style.background = 'grey';
  }
}


document.querySelector('.info__newsletter__btn__close').addEventListener('click', () => {
  closedModal()
  modalPopUp.style.display = 'none';
})
document.querySelector('.newsletter__btn--exit').addEventListener('click', () => {
  closedModal()
  modalPopUp.style.display = 'none';
})

window.addEventListener('keyup', (e) => {
  if (e.key === "Escape") {
    closedModal()
    modalPopUp.style.display = 'none';
  }

})


let cambio = 0
async function divisas(moneda) {

  let response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${moneda}.json`)

  if (response.ok) {
    let respo = await response.json()
    cambio = respo[moneda]

    switch (selector.value) {
      case 'usd':
        precios[0].innerHTML = '$' + Math.floor(cambio * 0);
        precios[1].innerHTML = '$' + Math.floor(cambio * 25);
        precios[2].innerHTML = '$' + Math.floor(cambio * 60);
        break;

      case 'eur':
        precios[0].innerHTML = Math.floor(cambio * 0) + '€';
        precios[1].innerHTML = Math.floor(cambio * 25) + '€';
        precios[2].innerHTML = Math.floor(cambio * 60) + '€';
        break;

      case 'gbp':
        precios[0].innerHTML = '₤' + Math.floor(cambio * 0);
        precios[1].innerHTML = '₤' + Math.floor(cambio * 25);
        precios[2].innerHTML = '₤' + Math.floor(cambio * 60);
        break;

      default:
        alert('parametro incorrecto');
        break;

    }

  }

}

let precios = document.querySelectorAll('mark')

let selector = document.querySelector('.pricing__currency__select');
selector.addEventListener('change', () => {

  divisas(selector.value);

})

window.addEventListener("DOMContentLoaded", () => {
  divisas(selector.value);

});

function closedModal() {
  sessionStorage.setItem('value', '0');

}

class Slider {
  constructor() {
    this.images = document.getElementsByClassName('slide__img');
    this.buttons = document.getElementsByClassName('slide__btn');
    this.cont = 0;
    this.change()
  }

  change() {
    setInterval(() => {
      this.images[this.cont].classList.remove('slide__img--active')
      this.buttons[this.cont].classList.remove('slide__btn--active')

      this.cont < 3 ? this.cont++ : this.cont = 0
      this.images[this.cont].classList.add('slide__img--active')
      this.buttons[this.cont].classList.add('slide__btn--active')

    }, 2000)
  }
};

const images = document.getElementsByClassName('slide__img')
const buttons = document.getElementsByClassName('slide__btn')
new Slider()


setInterval(console.log('Bazinga'), 2000)
