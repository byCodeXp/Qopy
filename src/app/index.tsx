import { render } from 'react-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './store/hooks';
import { selectActive } from './modules/navigationPanel/reducer/selectors';

import { Frame } from './frame';
import { NavigationPanel } from './modules/navigationPanel';

import './tailwind.css';

const App = () => {
    const active = useAppSelector(selectActive);

    return (
        <Frame extra={<NavigationPanel />}>
            {active !== -1 && (
                <textarea
                    spellCheck={false}
                    className="appearance-none resize-none w-full h-full outline-none text-white bg-[#1B1B1B] p-[8px] font-mono text-[14px]"
                ></textarea>
            )}
        </Frame>
    );
};

render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root'),
);
