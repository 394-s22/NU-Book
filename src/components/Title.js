
// import React from 'react'

// function Title() {
//   return (
//     <div id="navbar">
//       <h1>NU Book</h1>
//     </div>
//   )
// }


// export default Title


import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {signInWithGoogle, useUserState,addData, signOut, useData} from '../utilities/firebase.js';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup } from 'firebase/auth';
import { AddUser } from "../App.js";
import { dictToList } from './ListForm.js';

const LoginButton = () => (
  <button className="btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

const checkEmail = (current_user, data) =>{
  const all_users = dictToList(data["users"]);
  const all_emails = all_users.filter(user => user["email"] === current_user["email"]);
  // console.log(all_emails);
  return all_emails.length === 0;
}

let state = 0;

const Title = () => {
  const [user] = useUserState();

  // get all users
  const [data, loading, error] = useData('/'); 
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the books...</h1>

  if(user){
    if (state === 0){
      console.log(checkEmail(user, data))
      if (checkEmail(user, data) ){
        
        AddUser(user);
        state = 1;
      }
    }
  }
  
  return (
    <div>
      <AppBar position="fixed" style={{ background: " #410ca3" }}>

        <Toolbar color="purple">
          <Typography variant="h6">NU Book</Typography>
          { user ? <SignOutButton /> : <LoginButton/> }
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Title;
/*
function StackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'My home' }}
        />
      </Stack.Navigator>
    );
  }

  export default StackScreen
  */