import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
                    {children}
                </div>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}