// Importăm funcția throttle din pachetul 'lodash.throttle':
import throttle from 'lodash.throttle';

// Importăm clasa Vimeo pentru manipularea videourilor Vimeo:
import Vimeo from '@vimeo/player';

// Selectăm elementul iframe pentru playerul Vimeo:
const iframe = document.getElementById('vimeo-player');

// Inițializăm un nou obiect Vimeo utilizând elementul iframe selectat:
const player = new Vimeo(iframe);

// Definim funcția saveTimeToLocalStorage utilizând throttle:
const saveTimeToLocalStorage = throttle(time => {
  // Salvăm timpul curent al videoplayer-ului în localStorage:
  localStorage.setItem('videoplayer-current-time', time);
}, 1000); // Aplicăm throttle pentru a limita frecvența de apel a funcției la fiecare 1000 de milisecunde (1 secundă).

// Adaugăm un ascultător pentru evenimentul 'timeupdate' al playerului:
player.on('timeupdate', function (data) {
  // Obținem timpul curent al videoplayer-ului din datele evenimentului:
  const currentTime = data.seconds;
  // Salvăm timpul curent în localStorage utilizând funcția saveTimeToLocalStorage:
  saveTimeToLocalStorage(currentTime);
});

// Adaugăm un ascultător pentru evenimentul 'load' al ferestrei:
window.onload = () => {
  // Obținem timpul salvat anterior din localStorage:
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    // Încercăm să setam timpul curent al playerului Vimeo utilizând valoarea salvată:
    try {
      player.setCurrentTime(storedTime);
    } catch (error) {
      // Gestionăm diferitele tipuri de erori care pot apărea:
      switch (error.name) {
        case 'RangeError':
          console.log('Invalid time.'); // Afișăm un mesaj în consolă pentru o valoare de timp invalidă.
          break;
        default:
          console.log('Error occurred.'); // Afișăm un mesaj în consolă pentru alte erori.
          break;
      }
    }
  }
};
