import React from 'react';
import ReactDOM from 'react-dom';
import ActivityHero from './components/ActivityHero';
import IntroHero from './components/IntroHero';

const App = () => [<IntroHero key="intro-hero" />, <ActivityHero key="activity-hero" />];

ReactDOM.render(<App />, document.getElementById('container'));
