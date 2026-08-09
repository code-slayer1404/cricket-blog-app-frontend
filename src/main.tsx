import ReactDOM from 'react-dom/client';
import App from './App'; // no .jsx extension
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
);
