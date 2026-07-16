import { Box ,  Card , GridItem , Grid   , Heading , Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

interface TodoProps {
 
  title: string;
  details: string;
}

export default function Todo({
  
  title,
  details,
}: TodoProps) {
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

>
 {title}
</Heading> 
<Text fontSize="sm">
  {details}
</Text>
  </GridItem>

    <GridItem  p={2} display="flex" justifyContent="space-around" alignItems="center" gap={2}>
        <IconButton className="icon-butt" aria-label="Search database" style={{color : "#8bc34a" , background : "white" ,borderRadius : "50%" , border : "solid #8bc34a 3px" }}>
<FaCheck />
</IconButton>
        <IconButton className="icon-butt" aria-label="Search database" style={{color : "#1769aa" , background : "white" ,borderRadius : "50%" , border : "solid #1769aa 3px" }}>
<MdEdit />
</IconButton>
        <IconButton className="icon-butt" aria-label="Search database" style={{color : "#b32c17" , background : "white" ,borderRadius : "50%" , border : "solid #b32c17 3px" }}>
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