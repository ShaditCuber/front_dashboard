import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import RouterApp from '../Router';
import { UsuarioProvider } from './context/AuthContext';
import Layout from './layout/Layout';
import { Toaster } from 'sonner'
const queryClient = new QueryClient();


export default function App() {
  return (
    <>
      <Toaster richColors closeButton position="top-center" />
      <QueryClientProvider client={queryClient}>
        <UsuarioProvider>
          <BrowserRouter>
            <Layout>
              <RouterApp />
            </Layout>
          </BrowserRouter>
        </UsuarioProvider>
      </QueryClientProvider>
    </>
  );
}