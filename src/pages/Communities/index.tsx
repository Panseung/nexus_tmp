import React from 'react';
import styles from './Communities.module.scss';

const Communities = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Communities</h1>
      <p className={styles.description}>
        Explore and manage communities and groups.
      </p>
      <div className={styles.content}>
        <p>Communities page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default Communities;
