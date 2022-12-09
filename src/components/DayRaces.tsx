import { useState, useEffect } from "react";
import { VStack, Flex, List, ListItem, Box } from "@chakra-ui/react";
import MiniRaceCard from "./MiniRaceCard";
import Subheading from "./Subheading";
import axios from "axios";
import { format } from "date-fns";

interface DayRacesInput {
  title: string;
}

export default function DayRaces({ title }: DayRacesInput) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/official").then((res) => {
      setData(res.data);
    });
  }, []);

  const today = new Date();
  const groups = data.map((item: any) =>
    new Date(item.date).getTime() <= today.getTime()
      ? format(new Date(item.date), "MMMM d, y")
      : undefined
  );
  const uniqueGroups = groups.filter(
    (group, index) => groups.indexOf(group) === index
  );

  return (
    <Box>
      {uniqueGroups.map((group) => (
        <Flex pt={"5"} flexFlow={"column"} alignItems={"center"}>
          <Subheading
            text={group === format(today, "MMMM d, y") ? "today" : group!}
          />
          <VStack
            w={"70%"}
            mt={1}
            spacing={3}
            overflow={"scroll"}
            backgroundColor={"secondary.900"}
            rounded={"xl"}
          >
            <List w={"100%"}>
              {data
                .filter(
                  (item: any) =>
                    format(new Date(item.date), "MMMM d, y") === group
                )
                .map((item: any) => (
                  <ListItem key={item._id}>
                    <MiniRaceCard item={item} />
                  </ListItem>
                ))}
            </List>
          </VStack>
        </Flex>
      ))}
    </Box>
  );
}
