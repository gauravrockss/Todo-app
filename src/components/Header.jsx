import React, { createContext, useContext } from 'react';
import useSnack from '../hooks/useSnack';
import Navbar from './Navbar';
import { ThemeContextProvider } from '../style/theme';
import { CssBaseline } from '@mui/material';

const SnackContext = createContext();

const Header = ({ children }) => {
    const { SnackBar, showMessage } = useSnack();

    return (
        <>
            <ThemeContextProvider>
                <CssBaseline />
                <SnackContext.Provider value={showMessage}>
                    <Navbar>{children}</Navbar>

                    {SnackBar}
                </SnackContext.Provider>
            </ThemeContextProvider>
        </>
    );
};

const useMessage = () => {
    const showMessage = useContext(SnackContext);

    function showSuccess(msg) {
        showMessage({ success: msg });
    }

    function showError(msg) {
        showMessage({ error: msg });
    }

    return { showError, showSuccess };
};

export default Header;

export { useMessage };
