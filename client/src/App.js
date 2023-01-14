import { useEffect, useState } from 'react'
import { accessToken, logout } from './spotify';
import { catchErrors } from './utils'
import styles from './styles';
import Login from './pages/Login';
import Nav from './pages/Nav';
import Profile from './pages/Profile';
import { toast, Toaster } from 'react-hot-toast';

function App() {
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(accessToken)
  }, [])

  return (
    <div className={styles.container}>
      {token ? <Profile /> : <Login />}

    </div>
  );
}

export default App;
