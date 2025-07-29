import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn, verifyToken } from '../../shared/api/auth.api';
import { useAuthStore } from '../../app/store/authStore';
import EnvironmentSelector from '../../shared/ui/EnvironmentSelector';
import styles from './SignIn.module.scss';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    // 저장된 이메일/비밀번호 로드
    loadCredentials();

    // 이미 로그인되어 있는지 확인
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await verifyToken();
      setUser(userData);

      const from = (location.state as LocationState)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch {
      // 로그인되지 않은 상태이므로 무시
    }
  };

  const loadCredentials = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);

      // 자동 로그인 설정
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      // 토큰 검증하여 사용자 정보 가져오기
      const userData = await verifyToken();
      setUser(userData);

      // 원래 페이지로 리다이렉트
      const from = (location.state as LocationState)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>로그인</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${emailError ? styles.error : ''}`}
              placeholder="your@email.com"
              required
            />
            {emailError && (
              <span className={styles.errorText}>
                유효한 이메일을 입력해주세요.
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${passwordError ? styles.error : ''}`}
              placeholder="••••••"
              required
            />
            {passwordError && (
              <span className={styles.errorText}>비밀번호를 입력해주세요.</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <EnvironmentSelector />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              로그인 정보 기억하기
            </label>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
