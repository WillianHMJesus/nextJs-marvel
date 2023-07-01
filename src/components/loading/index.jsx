import styles from './styles/Loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loader_container}>
      <img src="/img/loading.gif" alt="Loading" />
    </div>
  )
}