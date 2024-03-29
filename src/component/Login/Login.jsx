import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    console.log(app)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }


    const handleGithubSignIn =()=>{

        signInWithPopup(auth,githubProvider)
        .then(result=>{
            const loggedInUser = result.user
            console.log(loggedInUser)
            setUser(loggedInUser);
        })
        .catch(error =>{
            console.log(error)
        })

    }

    // const handleSignOut = () => {
    //     signOut(auth)
    //         .then(result => {
    //             console.log(result);
    //             setUser(null);
    //         })

    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error)

            })
    }
    return (
        <div>
            {user ?
                <button onClick={handleSignOut}>Sign out</button> :
                <div>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                    <button onClick={handleGithubSignIn}>Github Login</button>
                </div>

            }

            {user && <div>
                <h1>User:</h1> {user.displayName}
                <h1>Email: {user.email}</h1>
                <img src={user.photoURL} alt="" />
            </div>}


        </div>

    );
};

export default Login;