import {createStackNavigator} from "@react-navigation/stack"
import React from 'react'
import Login from '../screen/Login'
import Register from '../screen/Register'
import ForgotPassword from "../screen/ForgotPassword"
const Stack = createStackNavigator()
const MyStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
    </Stack.Navigator>
  )
}

export default MyStack

