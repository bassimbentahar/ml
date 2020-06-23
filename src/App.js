import React from 'react';
import './App.css';
import Main from './layouts/Main/Main'
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Grid from './Containers/central/Strategies'
import Routes from './Routes';


const browserHistory = createBrowserHistory();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
                <Routes />
            </Router>
        </ThemeProvider>

    );
}

export default App;
