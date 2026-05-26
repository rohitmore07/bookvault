import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { BookProvider } from './context/BookContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <BookProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              className:
                'dark:!bg-slate-800 dark:!text-white !rounded-xl !shadow-lg',
              success: {
                iconTheme: { primary: '#4f46e5', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#dc2626', secondary: '#fff' },
              },
            }}
          />
        </BookProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
