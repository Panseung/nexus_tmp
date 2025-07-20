import React from 'react';
import Counter from '../../shared/ui/Counter';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Nexus</h1>
      <p className={styles.description}>
        Your React + TypeScript + Sass + Zustand application
      </p>
      <Counter />
    </div>
  );
};

export default Home;
