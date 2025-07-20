import React from 'react';
import styles from './Logs.module.scss';

const Logs = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Logs</h1>
      <p className={styles.description}>
        View system logs and activity history.
      </p>
      <div className={styles.content}>
        <p>Logs page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default Logs;
