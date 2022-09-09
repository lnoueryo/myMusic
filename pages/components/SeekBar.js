import styles from '../../styles/Home.module.css'
import { useDispatch } from 'react-redux'
import { changeCurrentTime } from "../../store/modules/audio";
import { useEffect, useRef, useState } from "react";
import store from '../../store';
export default function SeekBar({audio}) {
  const dispatch = useDispatch();
  const rangeBarFrame = useRef();
  const rangeBar = useRef();
  const [isMouse, setIsMouse] = useState(false);

  useEffect(() => {
    if(audio) {
      rangeBar.current.style.width = (Math.round((100 / audio.duration * audio.currentTime) * 5) / 5) + '%'
    }
  }, [audio?.currentTime]);

  const emptyObj = (obj) => Object.keys(obj).length == 0;

  const onPreventDrag = (e) => {
    e.preventDefault();
  }

  const onDragStart = (e) => {
    if(emptyObj(store.getState().audio.selectedMusic)) return;
    rangeBar.current.style.transition = 'initial';
    const ratio = e.clientX / rangeBarFrame.current.getBoundingClientRect().width;
    rangeBar.current.style.width = (Math.round((ratio * 100) * 5) / 5) + '%';
    audio.currentTime = audio.duration * ratio;
    const action = changeCurrentTime(audio.currentTime)
    dispatch(action)
    setIsMouse(!isMouse)
  }

  const onDrag = (e) => {
    if(isMouse) {
      const ratio = e.clientX / rangeBarFrame.current.getBoundingClientRect().width;
      rangeBar.current.style.width = (Math.round((ratio * 100) * 5) / 5) + '%';
      audio.currentTime = audio.duration * ratio;
      const action = changeCurrentTime(audio.currentTime)
      dispatch(action)
    }
  }

  const onDragEnd = () => {
    if(!isMouse) return;
    rangeBar.current.style.transition = 'all 1s';
    setIsMouse(!isMouse)
  }

  return (
    <>
    {isMouse && <div onMouseOut={onDragEnd} onMouseUp={onDragEnd} onMouseMove={onDrag} style={{position: 'fixed', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1000, cursor:'pointer'}}></div>}
    <div className={styles.range}>
      <div ref={rangeBarFrame} onMouseDown={onDragStart} onMouseUp={onDragEnd} onDragStart={onPreventDrag} style={{width: '100%', height: '10px', cursor:'pointer'}}>
        <div ref={rangeBar} style={{width: '0%', height: '5px', cursor:'pointer', backgroundColor: 'red', transition: 'all 1s'}}></div>
      </div>
    </div>
    </>
  )
}