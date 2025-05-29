import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useState } from 'react';
import RoutesPage from "./routes/RoutesPage";

export const host = process.env.REACT_APP_BACKEND_URL;
export const ParamContext = createContext();
const theme = createTheme({
    typography: {
        fontFamily: `'Source Sans Pro', sans-serif`,
    },
});
function App() {
    const [isSignIn, setIsSignin] = useState(()=> {return localStorage.getItem("isSignIn") === "true";});
    
    return (
        <ParamContext.Provider value={{isSignIn, setIsSignin, host}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                }}>
                    <RoutesPage/>
                </Box>
            </ThemeProvider>
        </ParamContext.Provider>
    );
}
export default App;