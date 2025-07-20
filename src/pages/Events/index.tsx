import React from 'react';
import styles from './Events.module.scss';

const Events = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Events</h1>
      <p className={styles.description}>
        View and manage all events and activities.
      </p>
      <div className={styles.content}>
        <p>Events page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default Events;
