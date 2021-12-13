import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <a className={styles.selected} href="">Home</a>
          <a href="">Posts</a>
        </nav>
      </div>
    </header>
  );
}