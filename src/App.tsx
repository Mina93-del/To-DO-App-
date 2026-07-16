
import Todolist from './components/TodoList'
import "./App.css"
function App() {
 

  return (
<div className='App'   dir="rtl"
 style={{ padding: "40px 0", fontFamily : "Alexandria" , display : "flex" , alignItems :"center" , justifyContent : "center" , minHeight : "100vh" , background : "#191b1f"}}>
<Todolist />
</div>
  )
}

export default App
