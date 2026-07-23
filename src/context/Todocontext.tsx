import { createContext } from "react";
import type { Dispatch } from "react";
import type { ActionType, TodoType } from "../reducer/todosreducer";

export const TodoContext = createContext<TodoType[]>([]);

export const DispatchContext =
  createContext<Dispatch<ActionType> | null>(null);