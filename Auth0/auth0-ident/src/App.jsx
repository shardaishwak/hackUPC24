import { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './LogIn'
import LogoutButton from './LogOut'
import Profile from './profInfo'

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
      domain="dev-6j4l4fd4nkyj3gpu.us.auth0.com"
      clientId="APx3l7SPi6E80uJRxygJLfvtjkwXuDER"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>,
  );

function App() {
  const [count, setCount] = useState(0)

  //Should be changed when added to the final UI.
  /*return (
    <>
      <div>
        <LoginButton />
      </div>
      <div>
        <LogoutButton />
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )*/
}

export default App