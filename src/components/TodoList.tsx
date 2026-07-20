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
import { Box, Card, Separator, SegmentGroup } from "@chakra-ui/react";
import Todo from "./Todo";
import { GridItem, Grid } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react"
import { useState } from "react";
import { useContext } from "react";
import { Todocontext } from "../context/Todocontext";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useMemo } from "react";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { Textarea, Field, Stack } from "@chakra-ui/react"
import { toaster } from "./mytoast/Toasts"

interface TodoType {
  id: string;
  title: string;
  details: string;
  iscompleted: boolean;
}

export default function Todolist() {
  const [titleinp, settit] = useState("")
  const context = useContext(Todocontext);
  const [displayedtodo, setdisplaytodo] = useState("all")
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dialogtodo, setdialogtodo] = useState<TodoType | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");



  if (!context) {
    throw new Error("Todocontext.Provider is missing");
  }

  const { todos, settodos } = context;



  function handleaddclick() {
    const newtodo = {
      id: uuidv4(),
      title: titleinp,
      details: "",
      iscompleted: false
    }
    const updatedtodoss = [...todos, newtodo]
    settodos(updatedtodoss);
    localStorage.setItem("todos", JSON.stringify(updatedtodoss))
    settit("")
     toaster.create({
              description: "تم اضافة المهمة بنجاح",
              closable: true,
              type: "success"
            })
  }


  function showdeletedial(todo: TodoType) {
    setdialogtodo(todo);
    setDeleteOpen(true);
  }



  function handledelete() {
    if (!dialogtodo) return;

    const deletetodo = todos.filter((t) => t.id !== dialogtodo.id);

    settodos(deletetodo);
    localStorage.setItem("todos", JSON.stringify(deletetodo));
    setDeleteOpen(false);
 toaster.create({
              description: "تم حذف المهمة بنجاح",
              closable: true,
              type: "error"
            })
  }

  function showeditdial(todo: TodoType) {
    setdialogtodo(todo);
    setTitle(todo.title);
    setDetails(todo.details);
    setEditOpen(true);
  }

  function handleEdit() {
    if (!dialogtodo) return;

    const updatedTodos = todos.map((t) => {
      if (t.id === dialogtodo.id) {
        return {
          ...t,
          title,
          details,
        };
      }

      return t;
    });

    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setEditOpen(false);
        toaster.create({
              description: "تم تعديل المهمة بنجاح",
              closable: true,
              type: "success"
            })
  }



  // function changedisplayedtype(e: { value: string }) {
  //   setdisplaytodo(e.value);
  // }
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    settodos(storedTodos)
  }, [])

  const completedtodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling complete")
      return t.iscompleted
    });
  }, [todos]);


  const noncompletedtodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling non-complete")
      return !t.iscompleted
    });
  }, [todos]);


  const todostoberender =
    displayedtodo === "completed"
      ? completedtodos
      : displayedtodo === "non-completed"
        ? noncompletedtodos
        : todos;


  const tooodos = todostoberender.map((t) => {
    return <Todo todo={t} key={t.id} showdelete={showdeletedial} showedit={showeditdial} />
  })

  return (
    <>


      <Dialog.Root lazyMount open={editOpen} onOpenChange={(e) => setEditOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title> تعديل المهمه</Dialog.Title>
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
      <Container maxW="600px">
        {/* <Button
          variant="outline"
          size="sm"
          key="success"

          onClick={() =>
            
          }
        >
          Show Toast
        </Button> */}
        <Card.Root minWidth="275px" padding={"10px"} style={{ maxHeight: "80vh", overflow: "scroll" }}>
          <Card.Body gap="2">
            {/* <Avatar.Root size="lg" shape="rounded">
          <Avatar.Fallback name="Nue Camp" />
        </Avatar.Root> */}
            <Card.Title mt="2" as="h4"
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
            }} style={{ marginTop: "20px" }} >
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
                  onClick={() => {
                    handleaddclick()
                  }}
                  disabled={titleinp.length == 0}
                  style={{ width: "100%", height: "100%", background: "#296fc5" }}>اضافة</Button>
              </GridItem>
            </Grid>
          </Card.Body>
          {/* <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer> */}
        </Card.Root>

      </Container>
    </>
  )
}