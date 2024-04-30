import{ NavigationContainer } from "@react-navigation/native"
import "react-native-gesture-handler"
import MyStack from "./routers/MyStack"
import TodoApp from "./screen/TodoApp"

const App = () => {
  return (
      
      // <NavigationContainer>
      //   <MyStack/>
      // </NavigationContainer>
      <TodoApp/>
  )
}

export default App;


