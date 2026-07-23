
import Todolist from './components/TodoList'
import "./App.css"

import { Toaster } from "./components/ui/toaster"
import Todosprovider from './context/Todosprovider';




function App() {
 

  return (
    <Todosprovider>
<div className='App'   dir="rtl"
 style={{ padding: "40px 0", fontFamily : "Alexandria" , display : "flex" , alignItems :"center" , justifyContent : "center" , minHeight : "100vh" , background : "#191b1f"}}>
<Toaster />
<Todolist />


</div>

    </Todosprovider>

  )
}

export default App
