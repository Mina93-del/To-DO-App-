
import Todolist from './components/TodoList'
import "./App.css"
import { Todocontext } from './context/Todocontext'
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";


const inittodos = [
{
  id : uuidv4()
 , 
  title: "قراءة كتاب" , 
  details : "bla bla bla " , 
  iscompleted : false
} ,
{
  id :uuidv4() , 
  title: "العب باليه " , 
  details : "bola bola bola " , 
  iscompleted : false
} ,
{
  id : uuidv4() , 
  title: "شيبسى وكاراتيه " , 
  details : "brsm brsm brsm " , 
  iscompleted : false
}
]


function App() {
 
const [todos , settodos ]= useState(inittodos)

  return (
<div className='App'   dir="rtl"
 style={{ padding: "40px 0", fontFamily : "Alexandria" , display : "flex" , alignItems :"center" , justifyContent : "center" , minHeight : "100vh" , background : "#191b1f"}}>

<Todocontext.Provider value={{todos , settodos }}>
<Todolist />

   </Todocontext.Provider>

</div>
  )
}

export default App
