import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import HomeDrawer from './navigation/HomeDrawer';
import { AppProvider } from './context/AppContext';

const App = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  }

  return (
    <AppProvider>
      <NavigationContainer theme={navTheme} >
        <HomeDrawer/>
      </NavigationContainer>
    </AppProvider>
  )
}

export default App;