import { useEffect, useRef, useState } from "react";
import styles from '../../styles/Home.module.css'
import store from '../../store'
import Icon from '@mdi/react'
import { mdiPlay, mdiFastForward, mdiRewind, mdiPause, mdiSkipNext, mdiSkipPrevious  } from '@mdi/js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { changeDuration } from "../../store/modules/audio";
export default function Footer() {
  const dispatch = useDispatch()
  const selectedMusic = useSelector(state => state.audio.audioSrc);
  // const duration = useSelector(state => state.audio.duration);
  let duration
  const MIN_RANGE = 0
  const MAX_RANGE = 1000
  const [playToggle, setPlayToggle] = useState(true)
  const audio = useRef();
  const range = useRef();
  const onPlayOrPause = () => {
    playToggle ? audio.current.play() : audio.current.pause();
    setPlayToggle(prev => !prev);
  };
  const onChangeTime = (e) => {
    // range.current.value = e.target.value;
    audio.current.currentTime = e.target.value / MAX_RANGE * duration;
  }
  useEffect(() => {
    range.current.value = 0;
    if(audio) {
      duration = audio.current.duration;
      audio.current.addEventListener('timeupdate', (e) => {
        range.current.value = MAX_RANGE / duration * e.target.currentTime;
      });
      audio.current.addEventListener('durationchange', () => {
        console.log('Hello')
        duration = audio.current.duration;
        // range.current.value = 0;
      });
    }
  }, [audio]);
  return (
    <footer className={styles.footer}>
      {
        audio &&
      <audio ref={audio} src={'/' + (selectedMusic || 'sakura') + '.mp3'}>
        あなたのブラウザーは <code>audio</code>要素をサポートしていません。
      </audio>
      }
      <div className={styles.range}>
        <input type="range" min={MIN_RANGE} max={MAX_RANGE} ref={range} step="1" onChange={onChangeTime} />
      </div>
      <div>
        <div className={styles['song-name']}>
          {selectedMusic}
        </div>
        <div>
          <Icon path={mdiRewind}
            className={styles['controller-icon']}
            size={2}
            color="red"
          />
          {
            playToggle ?
            <Icon path={mdiPlay}
              className={styles['controller-icon']}
              size={2}
              color="red"
              onClick={onPlayOrPause}
            />
            :
            <Icon path={mdiPause}
              className={styles['controller-icon']}
              size={2}
              color="red"
              onClick={onPlayOrPause}
            />

          }
          <Icon path={mdiFastForward}
            className={styles['controller-icon']}
            size={2}
            color="red"
          />
        </div>
      </div>
    </footer>
  )
}