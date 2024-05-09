import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBu9c37aT117-hjyZTiVOwg7Ca66P58768",
    authDomain: "user-login-83fc4.firebaseapp.com",
    databaseURL: "https://user-login-83fc4-default-rtdb.firebaseio.com",
    projectId: "user-login-83fc4",
    storageBucket: "user-login-83fc4.appspot.com",
    messagingSenderId: "943317391594",
    appId: "1:943317391594:web:dbeb73b76583a1a3a19f93",
    measurementId: "G-SH64LGZF59"
  };

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


  
//Listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        //Get data (only shows data for logged in users)
        getDocs(collection(db, 'instructions')).then(snapshot => {
        console.log(snapshot)
        setupInfo(snapshot);
        setupUI(user);
})
    } else {
        setupUI();
        setupInfo([]);
    }
})


//Sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //Sign up the user 
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        const modal = document.querySelector('#modal-signup');
        signupForm.reset();
        modal.style.display = 'none'; // doesnt close properly
        
    })
})

//Logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth);
})

//Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const email =  loginForm['user-email'].value;
    const password = loginForm['user-password'].value;

    signInWithEmailAndPassword(auth, email, password).then((cred) => {
        //close modal and reset form
        const modal = document.querySelector('#modal-login');
        modal.style.display = 'none';
        loginForm.reset();

    })

})