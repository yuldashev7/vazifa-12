import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from './config/query-client.js';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </BrowserRouter>
);
