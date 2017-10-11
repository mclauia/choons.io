import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCayq0PX6E2W-nvHINwyo_KllzRXLyLTgY",
    authDomain: "project-7042796239197371836.firebaseapp.com",
    databaseURL: "https://project-7042796239197371836.firebaseio.com",
    projectId: "project-7042796239197371836",
    storageBucket: "project-7042796239197371836.appspot.com",
    messagingSenderId: "46045058608"
});

const authProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

// auth.signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });

const DB = firebase.database();
const TUNES = 'tunes';

export function initAuthApp(dispatch) {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // console.log('on auth change', user)
            dispatch({ type: 'USER_AUTHED', payload: user.uid });

            const fireTunes = DB.ref(`users/${user.uid}/${TUNES}`);
            fireTunes.on('value', (fireResponse) => {
                const tunes = fireResponse.val();

                dispatch({ type: 'GOT_TUNES', payload: tunes })
            })
        } else {
            // No user is signed in.
            auth.signInWithRedirect(authProvider);
        }
    });

    auth.getRedirectResult().then((result) => {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        // const user = result.user;
        // console.log('on redirect', user);
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        console.log(errorCode, errorMessage)
    });
}

export function pushNewTune(tune, userId) {
    const fireTunes = DB.ref(`users/${userId}/${TUNES}`);
    const next = fireTunes.push();
    const tuneId = next.key;

    next.set({
        id: tuneId,
        ...tune
    });
}

export function updateTune(tune, userId) {
    const fireTune = DB.ref(`users/${userId}/${TUNES}/${tune.id}`);
    fireTune.set(tune)
}