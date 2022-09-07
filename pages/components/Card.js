import styles from '../../styles/Home.module.css'
import { useDispatch } from 'react-redux'
import { changeAudioSrc } from "../../store/modules/audio";
export default function Card({id, title}) {
  const dispatch = useDispatch()
  const onSelectMusic = (title) => {
    const action = changeAudioSrc(title)
    dispatch(action)
  }
  return (
    <div className={styles.grid}>
      <div className={styles.card} onClick={() => onSelectMusic(title)}>
        <h2>{title}</h2>
        <p>Find in-depth information about Next.js features and API.</p>
      </div>
    </div>
  )
}