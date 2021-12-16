import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import HomeDrawer from './navigation/HomeDrawer';

const App = () => {
  return (
    <NavigationContainer>
      <HomeDrawer/>
    </NavigationContainer>
  )
}

export default App;