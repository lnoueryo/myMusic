import { useEffect, useRef, useState } from "react";
import styles from '../../styles/Home.module.css'
import store from '../../store'
import Icon from '@mdi/react'
import { mdiPlay, mdiFastForward, mdiRewind, mdiPause, mdiSkipNext, mdiSkipPrevious, mdiRepeatOnce } from '@mdi/js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { changeDuration, changeCurrentTime, selectMusic, changeRepeatToggle } from "../../store/modules/audio";
export default function Footer() {
  const MINIMUM_MUSIC_ID = 1;
  const dispatch = useDispatch();
  const selectedMusic = useSelector(state => state.audio.selectedMusic);
  const music = useSelector(state => state.audio.music);
  const currentTime = useSelector(state => state.audio.currentTime);
  const [playToggle, setPlayToggle] = useState(true);
  const [isMouse, setIsMouse] = useState(false);
  const audio = useRef();
  const rangeBarFrame = useRef();
  const rangeBar = useRef();
  const randomNum = Math.floor(Math.random() * music.length);
  const firstMusic = music[randomNum];
  useEffect(() => {
    let clean = false;
    if(audio) {
      const action = selectMusic(firstMusic)
      dispatch(action)
      audio.current.src = firstMusic.title
      audio.current.addEventListener('timeupdate', (e) => {
        const action = changeCurrentTime(e.target.currentTime)
        dispatch(action)
        rangeBar.current.style.width = (Math.round((100 / audio.current.duration * e.target.currentTime) * 5) / 5) + '%'
      });
      audio.current.addEventListener('durationchange', () => {
        if(!clean) {
          clean = true
          return;
        }
        play(audio.current)
      });
      audio.current.addEventListener('ended', () => {
        if(store.getState().audio.repeatToggle) return play(audio.current);
        skipMusic(1)
      });
    }
  }, []);
  const play = (audio) => {
    rangeBar.current.style.width = '0%'
    const action = changeDuration(audio.duration);
    dispatch(action)
    audio.play();
    setPlayToggle(false);
  }
  const skipMusic = (nextNum) => {
    const selectedMusic = store.getState().audio.selectedMusic;
    let nextId = selectedMusic.id + nextNum;
    if(nextId == 0) nextId = music.length;
    else if(music.length < nextId) nextId = MINIMUM_MUSIC_ID;
    const nextMusic = music.find(v => v.id == nextId);
    const action = selectMusic(nextMusic);
    dispatch(action);
  }
  const forwardOrRewind = (nextNum) => {
    rangeBar.current.style.transition = 'initial';
    audio.current.currentTime += nextNum;
    const action = changeCurrentTime(audio.current.currentTime)
    dispatch(action)
    rangeBar.current.style.transition = 'all 1s';
  }
  const emptyObj = (obj) => Object.keys(obj).length == 0;
  const onPlayOrPause = () => {
    if(emptyObj(selectedMusic)) return;
    playToggle ? audio.current.play() : audio.current.pause();
    setPlayToggle(prev => !prev);
  };
  const onPreventDrag = (e) => {
    e.preventDefault();
  }
  const onDragStart = (e) => {
    if(emptyObj(selectedMusic)) return;
    rangeBar.current.style.transition = 'initial';
    const ratio = e.clientX / rangeBarFrame.current.getBoundingClientRect().width;
    rangeBar.current.style.width = (Math.round((ratio * 100) * 5) / 5) + '%';
    audio.current.currentTime = audio.current.duration * ratio;
    const action = changeCurrentTime(audio.current.currentTime)
    dispatch(action)
    setIsMouse(!isMouse)
  }
  const onDrag = (e) => {
    if(isMouse) {
      const ratio = e.clientX / rangeBarFrame.current.getBoundingClientRect().width;
      rangeBar.current.style.width = (Math.round((ratio * 100) * 5) / 5) + '%';
      audio.current.currentTime = audio.current.duration * ratio;
      const action = changeCurrentTime(audio.current.currentTime)
      dispatch(action)
    }
  }
  const onDragEnd = () => {
    if(!isMouse) return;
    rangeBar.current.style.transition = 'all 1s';
    setIsMouse(!isMouse)
  }
  const changeTimeFormat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
  }
  const changeTitle = (title) => {
    return title.replace('/-/g', ' ');
  }
  return (
    <>
      {isMouse && <div onMouseOut={onDragEnd} onMouseUp={onDragEnd} onMouseMove={onDrag} style={{position: 'fixed', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1000, cursor:'pointer'}}></div>}
      <footer className={styles.footer}>
        {
          audio &&
        <audio ref={audio} src={'/' + (selectedMusic?.title) + '.mp3'}>
          あなたのブラウザーは <code>audio</code>要素をサポートしていません。
        </audio>
        }
        <div className={styles.range}>
          <div ref={rangeBarFrame} onMouseDown={onDragStart} onMouseUp={onDragEnd} onDragStart={onPreventDrag} style={{width: '100%', height: '10px', cursor:'pointer'}}>
            <div ref={rangeBar} style={{width: '0%', height: '5px', cursor:'pointer', backgroundColor: 'red', transition: 'all 1s'}}></div>
          </div>
        </div>
        <div>
          <div className={styles['song-name']}>
            {emptyObj(selectedMusic) || changeTitle(selectedMusic.title)}
          </div>
          <div style={{textAlign: 'center'}}>
            {changeTimeFormat(currentTime)} / {changeTimeFormat(store.getState().audio.duration)}
          </div>
          <div>
            <Icon path={mdiSkipPrevious}
              className={styles['controller-icon']}
              size={2}
              color="red"
              onClick={() => skipMusic(-1)}
            />
            <Icon path={mdiRewind}
              className={styles['controller-icon']}
              size={2}
              color="red"
              onClick={() => {forwardOrRewind(-5)}}
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
              onClick={() => forwardOrRewind(5)}
            />
            <Icon path={mdiSkipNext}
              className={styles['controller-icon']}
              size={2}
              color="red"
              onClick={() => skipMusic(1)}
            />
          </div>
          <div>
            <Icon path={mdiRepeatOnce}
              className={styles['controller-icon']}
              size={2}
              color={store.getState().audio.repeatToggle ? 'red' : 'gray'}
              onClick={() => {
                if(emptyObj(selectedMusic)) return;
                dispatch(changeRepeatToggle(!store.getState().audio.repeatToggle))
              }}
            />
          </div>
        </div>
      </footer>
    </>
  )
}
