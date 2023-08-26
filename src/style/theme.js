import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createContext, useMemo, useState } from 'react';

const ThemeContext = createContext({ toggleTheme: () => {} });

const ThemeContextProvider = (props) => {
    const [mode, setMode] = useState('light');

    const toggleTheme = () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

    const light = useMemo(
        () => ({
            background: {
                default: '#FAF9F8',
            },
            primary: {
                main: '#2564CF',
            },
            secondary: {
                main: '#fff',
            },
        }),

        []
    );

    const dark = useMemo(
        () => ({
            background: {
                default: '#11100F',
            },
            primary: {
                main: '#252423',
            },
            text: {
                primary: '#A19F9D',
            },
            secondary: {
                main: '#252423',
            },
        }),

        []
    );

    const theme = createTheme({
        palette: {
            mode,

            ...(mode === 'light' ? light : dark),
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        border: 'none',
                    },
                },
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;

export { ThemeContextProvider };
