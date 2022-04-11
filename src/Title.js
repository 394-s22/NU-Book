
import React from 'react'
import { BsSearch } from 'react-icons/bs';

function Title() {
  return (
  <nav class="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}} >
    <span class="navbar-brand mb-0 h1">NU Book</span>
    <a class="nav-link" href="#">List a Book</a>
    <div class="nav navbar-nav navbar-right">
    <form class="mx-2 my-auto">
            <div class="input-group">
                <input type="text" class="form-control" id="search" placeholder="Search" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="submit"><BsSearch /></button>
                </div>
            </div>
        </form>
    </div>
  </nav>
  )
}


export default Title



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