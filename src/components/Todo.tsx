import { Box, Button, Card, CloseButton, Dialog, Grid, GridItem, Heading, IconButton, Portal, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Todocontext } from "../context/Todocontext";
import { Textarea , Field, Input, Stack } from "@chakra-ui/react"


interface TodoType {
  id: string;
  title: string;
  details: string;
  iscompleted: boolean;
}
interface TodoProps {
  todo: TodoType;
}

export default function Todo({
  todo ,
}: TodoProps) {


const context = useContext(Todocontext);

if (!context) {
  throw new Error("Todocontext.Provider is missing");
}
const { todos, settodos } = context;
const [deleteOpen, setDeleteOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);
const [title, setTitle] = useState(todo.title);
const [details, setDetails] = useState(todo.details);


function handlecheck() {
 const updatetodo = todos.map((t) =>{
    if(t.id == todo.id) {
    //   if( t.iscompleted == true) {
    //           t.iscompleted = false ;
    //   }else {
    //   t.iscompleted = true ;

    // }
    t.iscompleted = !t.iscompleted ;
    }
    return (t)
  })
  settodos(updatetodo)
    localStorage.setItem("todos" , JSON.stringify(updatetodo))

}

function handledeleteclick () {
  setDeleteOpen(true)
}

function handledelete() {
const deletetodo = todos.filter((t) =>{
//     if(t.id == todo.id) {
// return(false)
//   }else{
//   return (true)}
    return t.id != todo.id ;

  })
  settodos(deletetodo)
      localStorage.setItem("todos" , JSON.stringify(deletetodo))

}
function handleEditClick() {
  setTitle(todo.title);
  setDetails(todo.details);
  setEditOpen(true);
}
function handleEdit() {
  const updatedTodos = todos.map((t) => {
    if (t.id === todo.id) {
      return {
        ...t,
        title,
        details,
      };
    }

    return t;
  });

  settodos(updatedTodos);
        localStorage.setItem("todos" , JSON.stringify(updatedTodos))
  setEditOpen(false);
}

  return (
 <>
<Dialog.Root
  lazyMount
  open={deleteOpen}
  onOpenChange={(e) => setDeleteOpen(e.open)}
>      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>هل انت متاكد من حذف المهمة ؟ </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
             لا يمكنك التراجع عن الحذف بعد اتمامه
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">إلغاء</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handledelete}>نعم قم بالحذف</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>

<Dialog.Root lazyMount open={editOpen} onOpenChange={(e) => setEditOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>هل انت متاكد من حذف المهمة ؟ </Dialog.Title>
            </Dialog.Header>
                  <Dialog.Body>
          <Stack gap={4}>
            <Field.Root>
              <Field.Label>العنوان</Field.Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>التفاصيل</Field.Label>
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Field.Root>
          </Stack>
        </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">إلغاء</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleEdit}>حفظ</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>

 
<Card.Root className="todocart" minWidth="275px" background="#283593" color={"white"} marginTop={"7px"}>
<Card.Body p={3}>
          {/* <Avatar.Root size="lg" shape="rounded">
          <Avatar.Fallback name="Nue Camp" />
        </Avatar.Root> */}



<Box w="100%">  <Grid
    templateColumns="3fr 1fr"
    width="100%"
    gap={1}
    color={"white"}
  >
    <GridItem  p={2}   >
<Heading
  as="h2"
    fontSize="17px"
    fontFamily="Alexandria"
textDecoration={todo.iscompleted ? "line-through" : "none"}
>
 {todo.title}
</Heading> 
<Text fontSize="sm">
  {todo.details}
</Text>
  </GridItem>

    <GridItem  p={2} display="flex" justifyContent="space-around" alignItems="center" gap={2}>
        <IconButton onClick={() => {handlecheck()}} className="icon-butt" aria-label="Search database" style={{color : todo.iscompleted ==false?"#8bc34a"  :"white"   , background :todo.iscompleted ==false?  "white" : "#8bc34a",borderRadius : "50%" , border : "solid #8bc34a 3px" }}>
<FaCheck />
</IconButton>
       <IconButton onClick={handleEditClick} className="icon-butt" aria-label="Search database" style={{color : "#1769aa" , background : "white" ,borderRadius : "50%" , border : "solid #1769aa 3px" }}>
<MdEdit />
</IconButton>
        <IconButton onClick={handledeleteclick} className="icon-butt" aria-label="Search database" style={{color : "#b32c17" , background : "white" ,borderRadius : "50%" , border : "solid #b32c17 3px" }}>
<MdDelete />
</IconButton>
    </GridItem>
  </Grid>
        </Box>
      </Card.Body>
      {/* <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer> */}
    </Card.Root>
</>
  )
}