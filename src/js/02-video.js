import Vimeo from '@vimeo/player';
import _ from 'lodash';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);

const saveTimeToLocalStorage = _.throttle(time => {
  localStorage.setItem('videoplayer-current-time', time);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeToLocalStorage(currentTime);
});

window.onload = () => {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    try {
      player.setCurrentTime(storedTime);
    } catch (error) {
      switch (error.name) {
        case 'RangeError':
          console.log('Invalid time.');
          break;
        default:
          console.log('Error occurred.');
          break;
      }
    }
  }
};
