// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// export default function Todolist() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="text">Text</Button>
//       <Button variant="contained">Contained</Button>
//       <Button variant="outlined">Outlined</Button>
//     </Stack>
//   );
// }
import { Container } from "@chakra-ui/react"
import { Box, Card , Separator , SegmentGroup  } from "@chakra-ui/react";
import Todo from "./Todo";
import {  GridItem , Grid    } from "@chakra-ui/react";
import { Input , Button } from "@chakra-ui/react"
import { useState } from "react";
import { useContext } from "react";
import { Todocontext } from "../context/Todocontext";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";





export default function Todolist() {
const [titleinp , settit] = useState("")
const context = useContext(Todocontext);
const [displayedtodo , setdisplaytodo] = useState("all")



if (!context) {
  throw new Error("Todocontext.Provider is missing");
}

const { todos, settodos } = context;



function handleaddclick () {
  const newtodo = {
    id : uuidv4() ,
    title : titleinp , 
    details : "" ,
    iscompleted : false
  }
  const updatedtodoss= [...todos , newtodo]
  settodos(updatedtodoss);
  localStorage.setItem("todos" , JSON.stringify(updatedtodoss))
  settit("")
}

const completedtodos = todos.filter((t) => {
  return t.iscompleted
})


// function changedisplayedtype(e: { value: string }) {
//   setdisplaytodo(e.value);
// }
useEffect(() =>{
const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
 settodos(storedTodos)}, [])
const noncompletedtodos = todos.filter((t) => {
  return !t.iscompleted
})

 const todostoberender =
  displayedtodo === "completed"
    ? completedtodos
    : displayedtodo === "non-completed"
    ? noncompletedtodos
    : todos;


 const tooodos = todostoberender.map ( (t) => {
    return <Todo todo={t} key={t.id}  />
  })

  return (
<Container maxW="600px">
<Card.Root minWidth="275px" padding={"10px"} style={{maxHeight : "80vh" , overflow : "scroll"}}> 
      <Card.Body gap="2">
        {/* <Avatar.Root size="lg" shape="rounded">
          <Avatar.Fallback name="Nue Camp" />
        </Avatar.Root> */}
        <Card.Title mt="2"  as="h4"
  fontSize="30px"
  fontWeight="bold"
    textAlign="center"
    marginBottom="7px"

   >مهامى</Card.Title>
                    <Separator />
<SegmentGroup.Root value={displayedtodo} onValueChange={(details) => {
    if (details.value !== null) {
      setdisplaytodo(details.value);
    }
  }} style={{ marginTop : "20px"}} >
  <SegmentGroup.Indicator />
  <SegmentGroup.Items
    items={[
      { label: "الكل", value: "all" },
      { label: "المنجز", value: "completed" },
      { label: "غير المنجز", value: "non-completed" },
    ]}
    flex="1"
  />
</SegmentGroup.Root>
<Box mt={4}>
  {tooodos}
</Box> <Grid
      templateColumns="repeat(12, 1fr)"
      gap={0}
    >
      <GridItem
        colSpan={8}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width={"100%"}
        p={3}
      >
      <Input
      value={titleinp} 
      onChange={(e) => {
        settit(e.target.value)
      }}
      padding={"10px"} placeholder="ادخل المهمة الجديدة" variant="outline" />
      </GridItem>

      <GridItem
        colSpan={4}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        p={3}
      >
<Button
onClick={()=>{
  handleaddclick ()
}}
disabled = {titleinp.length ==0}
style={{width : "100%", height : "100%" , background : "#296fc5"}}>اضافة</Button>
      </GridItem>
    </Grid>
      </Card.Body>
      {/* <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer> */}
    </Card.Root>

    </Container>
  )
}