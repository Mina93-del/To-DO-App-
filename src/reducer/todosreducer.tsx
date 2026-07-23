import { v4 as uuidv4 } from "uuid";

export interface TodoType {
  id: string;
  title: string;
  details: string;
  iscompleted: boolean;
}

export type ActionType =
  | { type: "added"; payload: { newtitle: string } }
  | { type: "deleted"; payload: { id: string } }
  | { type: "edited"; payload: { id: string; title: string; details: string } }
  | { type: "get" }
  | { type: "togglecompleted"; payload: { id: string } };
export default function Reducer(
  currenttodos: TodoType[],
  action: ActionType
): TodoType[] {
  switch (action.type) {
    case "added": {
      const newtodo: TodoType = {
        id: uuidv4(),
        title: action.payload.newtitle,
        details: "",
        iscompleted: false,
      };
      const updatedtodos = [...currenttodos, newtodo];
      localStorage.setItem("todos", JSON.stringify(updatedtodos));
      return updatedtodos;
    }

    case "deleted": {
      const updatedtodos = currenttodos.filter((t) => t.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(updatedtodos));
      return updatedtodos;
    }

    case "edited": {
      const updatedTodos = currenttodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      return storedTodos;
    }

case "togglecompleted": {
  const updatedTodos = currenttodos.map((t) =>
    t.id === action.payload.id
      ? { ...t, iscompleted: !t.iscompleted }
      : t
  );

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return updatedTodos;
}
   
    default:
      throw new Error("Unknown action");
  }
}