
// import React from 'react'

// function Title() {
//   return (
//     <div id="navbar">
//       <h1>NU Book</h1>
//     </div>
//   )
// }


// export default Title


import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {signInWithGoogle, useUserState, signOut} from '../utilities/firebase.js';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup } from 'firebase/auth';

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

const Title = (props) => {
  const [user] = useUserState();
  return (
    <div>
      <AppBar position="fixed" style={{ background: " #410ca3" }}>

        <Toolbar color="purple">
          <Typography variant="h6">NU Book</Typography>
          { user ? <SignOutButton /> : <LoginButton /> }
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