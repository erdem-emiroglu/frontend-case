import styles from '@/app/page.module.scss';
import RickAndMortySelect from '@/components/Select/RickAndMortySelect';


export default function Home() {
  return (
    <main>
      <div className={styles.page}>
        <RickAndMortySelect />
      </div>
    </main>
  );
}
