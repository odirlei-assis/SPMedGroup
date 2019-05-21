import listar from "./pages/listar";
import login from "./pages/login";
import {createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";

const AuthStack = createStackNavigator({login}, 
  {
    headerMode: 'none'
  });

const MainNavigator = createStackNavigator({listar}, 
  {
    headerMode: 'none'
  });

export default createAppContainer(

  createSwitchNavigator({
    MainNavigator,
    AuthStack
  },{
    initialRouteName: "AuthStack"
  })
);