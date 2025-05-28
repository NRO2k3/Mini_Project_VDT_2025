import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import LoginForm from "./pages/Login";
import { createContext, useState } from 'react';

export const host = process.env.REACT_APP_BACKEND_URL;
export const ParamContext = createContext();
const theme = createTheme({
    typography: {
        fontFamily: `'Source Sans Pro', sans-serif`,
    },
});
function App() {
    const [isSignIn, setIsSignin] = useState(false);
    const [signUp, setSignUp] = useState(false);
    return (
        <ParamContext.Provider value={{isSignIn, setIsSignin, signUp, setSignUp, host}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                }}>
                    <LoginForm/>
                </Box>
            </ThemeProvider>
        </ParamContext.Provider>
    );
}
export default App;