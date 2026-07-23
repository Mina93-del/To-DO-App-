import { useContext } from "react";
import { TodoContext, DispatchContext } from "./Todocontext";

export function useTodos() {
  return useContext(TodoContext);
}

export function useTodosdispatch() {
  const dispatch = useContext(DispatchContext);

  if (!dispatch) {
    throw new Error("DispatchContext.Provider is missing");
  }

  return dispatch;
}