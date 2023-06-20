import React, {Component} from 'react';
import './App.css';
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import Main from "./main/Main";
import AppProvider from "./data/context/AppProvider";
import {CookiesProvider} from "react-cookie";
import OrganisationContainer from "./features/organisation/OrganisationContainer";


const theme = createTheme({
    palette: {
        secondary: {
            light: '#7fb434',
            main: '#5FA202',
            dark: '#427101',
        },
        primary: {
            light: '#4b727a',
            main: '#1F4F59',
            dark: '#15373e',
        },

        typography: {
            fontFamily: [
                "Nunito Sans", 'sans-serif'
            ].join(','),
        },
    }
});

class App extends Component {
    render() {
        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CookiesProvider>
                        <AppProvider>
                            <OrganisationContainer/>
                        </AppProvider>
                    </CookiesProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}

export default App;
