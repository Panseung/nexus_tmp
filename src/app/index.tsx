import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../widgets/Header';
import Sidebar from '../widgets/Sidebar';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Events from '../pages/Events';
import Communities from '../pages/Communities';
import Logs from '../pages/Logs';
import SignIn from '../pages/SignIn';
import ProtectedRoute from '../shared/ui/ProtectedRoute';
import { useSidebarStore } from './store';
import ThemeProvider from './providers/ThemeProvider';
import LanguageProvider from './providers/LanguageProvider';
import styles from './styles/App.module.scss';

const App = () => {
  const { isOpen, toggle, close } = useSidebarStore();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            {/* 공개 라우트 */}
            <Route path="/signin" element={<SignIn />} />

            {/* 보호된 라우트 */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className={styles.app}>
                    <Navigation />
                    <Sidebar
                      isOpen={isOpen}
                      onToggle={toggle}
                      onMenuClick={close}
                    />
                    <main className={styles.main}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/communities" element={<Communities />} />
                        <Route path="/logs" element={<Logs />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
