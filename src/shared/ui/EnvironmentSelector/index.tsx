import React, { useState, useEffect } from 'react';
import styles from './EnvironmentSelector.module.scss';

const EnvironmentSelector: React.FC = () => {
  const [currentEnv, setCurrentEnv] = useState('development');

  useEffect(() => {
    const env = localStorage.getItem('env') || 'development';
    setCurrentEnv(env);
  }, []);

  const handleEnvironmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newEnv = event.target.value;
    setCurrentEnv(newEnv);
    localStorage.setItem('env', newEnv);

    // 환경 변경 시 페이지 새로고침
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <label htmlFor="environment" className={styles.label}>
        환경
      </label>
      <select
        id="environment"
        value={currentEnv}
        onChange={handleEnvironmentChange}
        className={styles.select}
      >
        <option value="development">개발</option>
        <option value="production">프로덕션</option>
      </select>
    </div>
  );
};

export default EnvironmentSelector;
