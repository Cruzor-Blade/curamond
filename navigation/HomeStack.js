import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import CommentsScreen from '../screens/CommentsScreen';

const Stack = createStackNavigator();

export default HomeStack = () => {
    return (
        <Stack.Navigator
        initialRouteName='HomeStack'
        screenOptions={{
            detachPreviousScreen:true,
            presentation:'transparentModal',
            headerShown:false,
        }}
        >
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        </Stack.Navigator>
    )
}