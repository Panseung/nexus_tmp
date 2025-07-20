import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../widgets/Header';
import Sidebar from '../widgets/Sidebar';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Events from '../pages/Events';
import Communities from '../pages/Communities';
import Logs from '../pages/Logs';
import { useSidebarStore } from './store';
import ThemeProvider from './providers/ThemeProvider';
import styles from './styles/App.module.scss';

const App = () => {
  const { isOpen, toggle, close } = useSidebarStore();

  return (
    <ThemeProvider>
      <Router>
        <div className={styles.app}>
          <Navigation />
          <Sidebar isOpen={isOpen} onToggle={toggle} onMenuClick={close} />
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
      </Router>
    </ThemeProvider>
  );
};

export default App;
