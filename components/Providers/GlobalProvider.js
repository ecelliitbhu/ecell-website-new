import { ThemeProvider } from '@material-tailwind/react';
import { Provider as ReduxProvider } from 'react-redux';
import GlobalDialog from '../GlobalDialogWrapper/GlobalDialogWrapper';
import AuthGuard from './Authguard';
import { store } from '@/lib/redux/store';

const GlobalProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
        <GlobalDialog>
          <AuthGuard>
            {children}
          </AuthGuard>
        </GlobalDialog>
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
