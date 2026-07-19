import { createContext, type Dispatch, type SetStateAction } from "react";

export interface TodoType {
  id: string;
  title: string;
  details: string;
  iscompleted: boolean;
}
interface TodoContextType {
  todos: TodoType[];
  settodos: Dispatch<SetStateAction<TodoType[]>>;
}

export const Todocontext = createContext<TodoContextType | null>(null);