import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';

const CURRENT_TIME = "videoplayer-current-time";
const THROTTLE_TIME = 1000;

const vimeoPlayer = document.querySelector('#vimeo-player');
const player = new Vimeo(vimeoPlayer);

player.setCurrentTime(parseInt(localStorage.getItem(CURRENT_TIME), 10))
.then(seconds => console.log(`${seconds}`))
.catch(error => console.log(`${error}`));

const onPlay = currentTime => {
    player.getEnded().then(end => {
        if (end){
            console.log('Koniec filmu');
            localStorage.setItem(CURRENT_TIME, 0);
        }
        else {
            console.log('Film nadal się odtwarza');
            localStorage.setItem(CURRENT_TIME, parseInt(currentTime.seconds, 10));
        }
    })
}

player.on('timeupdate', throttle(onPlay, THROTTLE_TIME));
