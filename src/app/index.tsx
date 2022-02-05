import React from 'react';
import { render } from 'react-dom';
import { Tab } from './components/tab';

import './tailwind.css';

const App = () => {

    return (
        <header className="flex flex-row justify-between drag">
            <div className="flex flex-row gap-[2px] no-drag py-[2px] px-[2px]">
                <Tab label="index.tsx" />
                <Tab label="app.tsx" />
                <Tab label="test.tsx" />
            </div>
        </header>
    );
};

render(<App />, document.getElementById('root'));
