
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

const Title = () => {
  return (
    <div>
      <AppBar position="fixed" style={{ background: " #410ca3" }}>

        <Toolbar color="purple">
          <Typography variant="h6">NU Book</Typography>
          <Button color="inherit">Login</Button>
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