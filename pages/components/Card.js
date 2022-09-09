import styles from '../../styles/Home.module.css'
import { useDispatch } from 'react-redux'
import { selectMusic } from "../../store/modules/audio";
export default function Card(props) {
  const dispatch = useDispatch()
  const onSelectMusic = (music) => {
    const action = selectMusic(music)
    dispatch(action)
  }
  const changeTitle = (title) => {
    return title || title.replace(/-/g, ' ');
  }
  return (
    <div className={styles.grid}>
      <div className={styles.card} onClick={() => onSelectMusic(props)}>
        <h2>{props?.title && changeTitle(props.title)}</h2>
        <p>Find in-depth information about Next.js features and API.</p>
      </div>
    </div>
  )
}