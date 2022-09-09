import { useEffect, useRef, useState } from "react";
import styles from '../../styles/Home.module.css'
import store from '../../store'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { changeDuration, changeCurrentTime, selectMusic } from "../../store/modules/audio";
import SeekBar from './SeekBar'
import Contorller from './Controller'

const MINIMUM_MUSIC_ID = 1;

export default function Footer() {
  const dispatch = useDispatch();
  const duration = useSelector(state => state.audio.duration);
  const music = useSelector(state => state.audio.music);
  const currentTime = useSelector(state => state.audio.currentTime);
  const repeatToggle = useSelector(state => state.audio.repeatToggle);
  const audio = useRef();

  const randomNum = Math.floor(Math.random() * music.length);
  const firstMusic = music[randomNum];

  useEffect(() => {
    let clean = false;
    const action = selectMusic(firstMusic)
    dispatch(action)
    audio.current.src = firstMusic.title

    audio.current.addEventListener('timeupdate', (e) => {
      const action = changeCurrentTime(e.target.currentTime)
      dispatch(action)
    });

    audio.current.addEventListener('durationchange', () => {
      const action = changeDuration(audio.current.duration);
      dispatch(action)
      if(!clean) return clean = true;
      audio.current.play();
    });

    audio.current.addEventListener('ended', () => {
      if(repeatToggle) return audio.play();
      skipMusic(store.getState().audio, 1);
    });

  }, []);

  const skipMusic = ({selectedMusic, music}, nextNum) => {
    let nextId = selectedMusic.id + nextNum;
    if(nextId == 0) nextId = music.length;
    else if(music.length < nextId) nextId = MINIMUM_MUSIC_ID;
    const nextMusic = music.find(v => v.id == nextId);
    const action = selectMusic(nextMusic);
    dispatch(action);
    return nextMusic;
  }

  const changeTimeFormat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
  }

  const changeTitle = (title) => title.replace(/-/g, ' ');
  const emptyObj = (obj) => Object.keys(obj).length == 0;

  return (
    <>
      <footer className={styles.footer}>
        {
          audio &&
        <audio ref={audio} src={'/' + (store.getState().audio.selectedMusic.title) + '.mp3'}>
          あなたのブラウザーは <code>audio</code>要素をサポートしていません。
        </audio>
        }
        <SeekBar audio={audio.current} />
        <div>
          <div className={styles['song-name']}>
            {emptyObj(store.getState().audio.selectedMusic) || changeTitle(store.getState().audio.selectedMusic.title)}
          </div>
          <div style={{textAlign: 'center'}}>
            {changeTimeFormat(currentTime)} / {changeTimeFormat(duration)}
          </div>
          <Contorller audio={audio.current} skipMusic={skipMusic}></Contorller>
        </div>
      </footer>
    </>
  )
}
