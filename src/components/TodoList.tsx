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
import { v4 as uuidv4 } from 'uuid';


const todos = [
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



export default function Todolist() {

  const tooodos = todos.map ( (t) => {
    return <Todo title={t.title} details={t.details} key={t.id} />
  })
  return (
<Container maxW="600px">
<Card.Root minWidth="275px" padding={"10px"}>
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
<SegmentGroup.Root defaultValue="all" style={{ marginTop : "20px"}} >
  <SegmentGroup.Indicator />
  <SegmentGroup.Items
    items={[
      { label: "الكل", value: "all" },
      { label: "المنجز", value: "active" },
      { label: "غير المنجز", value: "done" },
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
      <Input padding={"10px"} placeholder="ادخل المهمة الجديدة" variant="outline" />
      </GridItem>

      <GridItem
        colSpan={4}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        p={3}
      >
<Button style={{width : "100%", height : "100%" , background : "#296fc5"}}>اضافة</Button>
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