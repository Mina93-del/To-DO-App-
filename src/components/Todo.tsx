import { Box, Card, Grid, GridItem, Heading, IconButton, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTodosdispatch} from "../context/usetodos";
import { toaster } from "./mytoast/Toasts"


interface TodoType {
  id: string;
  title: string;
  details: string;
  iscompleted: boolean;
}
interface TodoProps {
  todo: TodoType;
  showdelete: (todo: TodoType) => void;
  showedit : (todo: TodoType) => void;
}

export default function Todo({
  todo , showdelete , showedit
}: TodoProps) {


// const context = useContext(Todocontext);

// if (!context) {
//   throw new Error("Todocontext.Provider is missing");
// }

  const dispatch = useTodosdispatch();


function handlecheck() {
dispatch({
  type: "togglecompleted",
  payload: {
    id: todo.id,
  },
});
         toaster.create({
                  description: "تم التعديل بنجاح  ",
                  closable: true,
                  type: "success"
                })

}
function handleEditClick() {

  showedit(todo)
}


function handledeleteclick () {
  showdelete(todo)
}
  return (
 <>



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