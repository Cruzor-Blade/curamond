import React, { useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import HomeDrawer from './navigation/HomeDrawer';
import { AppProvider } from './context/AppContext';
import RNBootSplash from "react-native-bootsplash";


const App = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }

  }

  useEffect(() => {
    RNBootSplash.hide({fade:true})
  }, [])
  return (
    <AppProvider>
      <NavigationContainer theme={navTheme} >
        <HomeDrawer/>
      </NavigationContainer>
    </AppProvider>
  )
}

export default App;