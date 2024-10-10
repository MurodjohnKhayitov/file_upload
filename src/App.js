 import RouterMain from './root/RouterMain';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import useAuth from './hook/useAuth';

function App() {
  let auth = getAuth()
  const { setAuth } = useAuth();

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(user)
      } else {
        setAuth({})
      }
    })
    return findOut
  }, [auth])

  return (
    <div className="App">
      <RouterMain />

    </div>
  );
}

export default App;
