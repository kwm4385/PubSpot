import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import styles from '../css/app.css';
import '../semantic/dist/semantic.css';
import '../semantic/dist/components/dimmer';
import '../semantic/dist/components/transition';
import '../semantic/dist/components/dropdown';
import '../semantic/dist/components/modal';
import '../semantic/dist/components/rating';
import '../semantic/dist/components/tab';
import '../semantic/dist/components/popup';
import '../semantic/dist/components/sticky';

ReactDOM.render(<App />, document.getElementById('main'));
