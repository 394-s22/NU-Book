
// import React from 'react'

// function Title() {
//   return (
//     <div id="navbar">
//       <h1>NU Book</h1>
//     </div>
//   )
// }


// export default Title


// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import {signInWithGoogle, useUserState, signOut} from '../utilities/firebase.js';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup } from 'firebase/auth';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from '@mui/material';

const LoginButton = () => (
  <button className="btn-success btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn-success btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);
export let search;
const Title = () => {
  const [user] = useUserState();
  const [searched, setSearched] = React.useState("");
  const [searchVis, setSearchVis] = React.useState(false);
  search = searched;
  const handleClick = () => {
    setSearchVis(!searchVis);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          { user ? <SignOutButton /> : <LoginButton /> }
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          NU Book
          </Typography>
            <InputBase
              id="search-result"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearched(e.target.value)}
            />
            <IconButton onClick={handleClick} >
              <SearchIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
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