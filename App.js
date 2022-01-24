import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import HomeDrawer from './navigation/HomeDrawer';

const App = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  }
  return (
    <NavigationContainer theme={navTheme} >
      <HomeDrawer/>
    </NavigationContainer>
  )
}

export default App;