import MeansOfProduction from './components/MeansOfProduction'
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import * as firebase from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAivCwQlndv6n1VHJPi7AQGUcZyYdjI6Jo",
    authDomain: "hot-lunch-35d0c.firebaseapp.com",
    databaseURL: "https://hot-lunch-35d0c.firebaseio.com",
    projectId: "hot-lunch-35d0c",
    storageBucket: "hot-lunch-35d0c.appspot.com",
    messagingSenderId: "1066358109379",
    appId: "1:1066358109379:web:092b1653ee3787f195de76"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
        <MeansOfProduction />
    </Router>
    , document.getElementById('root'));

