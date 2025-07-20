import React from 'react';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Nexus</h1>
      <p className={styles.description}>
        Your React + TypeScript + Sass + Zustand application
      </p>
      <div className={styles.content}>
        <p>Home page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default Home;
