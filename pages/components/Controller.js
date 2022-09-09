import styles from '../../styles/Home.module.css'
import { useDispatch } from 'react-redux'
import { selectMusic, changeCurrentTime } from "../../store/modules/audio";
import Icon from '@mdi/react'
import { mdiPlay, mdiFastForward, mdiRewind, mdiPause, mdiSkipNext, mdiSkipPrevious, mdiRepeatOnce } from '@mdi/js';
import { useEffect, useState } from 'react';
import store from '../../store';

export default function Controller({audio, skipMusic}) {
  const dispatch = useDispatch();
  const [playToggle, setPlayToggle] = useState(true);

  useEffect(() => {
    if(audio) setPlayToggle(audio.paused);
  }, [audio?.paused])

  const onPlayOrPause = (audio) => {
    playToggle ? audio.play() : audio.pause();
    setPlayToggle(prev => !prev);
    return audio.paused;
  };

  const forwardOrRewind = (audio, nextNum) => {
    audio.currentTime += nextNum;
    const action = changeCurrentTime(audio.currentTime);
    dispatch(action);
    return audio.currentTime;
  }

  return (
    <div>
      <Icon path={mdiSkipPrevious}
        className={styles['controller-icon']}
        size={2}
        color="red"
        onClick={() => skipMusic(store.getState().audio, -1)}
      />
      <Icon path={mdiRewind}
        className={styles['controller-icon']}
        size={2}
        color="red"
        onClick={() => forwardOrRewind(audio, -5)}
      />
      {
        playToggle ?
        <Icon path={mdiPlay}
          className={styles['controller-icon']}
          size={2}
          color="red"
          onClick={() => onPlayOrPause(audio)}
        />
        :
        <Icon path={mdiPause}
          className={styles['controller-icon']}
          size={2}
          color="red"
          onClick={() => onPlayOrPause(audio)}
        />

      }
      <Icon path={mdiFastForward}
        className={styles['controller-icon']}
        size={2}
        color="red"
        onClick={() => forwardOrRewind(audio, 5)}
      />
      <Icon path={mdiSkipNext}
        className={styles['controller-icon']}
        size={2}
        color="red"
        onClick={() => skipMusic(store.getState().audio, 1)}
      />
  </div>
  )
}