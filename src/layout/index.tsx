import { render } from 'react-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';

import './styles.css';

render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('layout')
);
