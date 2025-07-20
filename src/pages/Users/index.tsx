import React from 'react';
import styles from './Users.module.scss';

const Users = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <p className={styles.description}>
        Manage and view all users in the system.
      </p>
      <div className={styles.content}>
        <p>Users page content will be implemented here.</p>
      </div>
    </div>
  );
};

export default Users;
