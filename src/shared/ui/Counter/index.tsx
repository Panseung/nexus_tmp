import React from 'react';
import { useStore } from '../../../app/store';
import styles from './Counter.module.scss';

const Counter = () => {
  const { count, increment, decrement, reset } = useStore();

  return (
    <div className={styles.counter}>
      <h2 className={styles.title}>Counter Example</h2>
      <div className={styles.display}>
        <span className={styles.count}>{count}</span>
      </div>
      <div className={styles.controls}>
        <button onClick={decrement} className={styles.button}>
          -
        </button>
        <button onClick={reset} className={styles.button}>
          Reset
        </button>
        <button onClick={increment} className={styles.button}>
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
