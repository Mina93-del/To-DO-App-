import { useReducer } from "react";
import type { ReactNode } from "react";

import Reducer from "../reducer/todosreducer";
import { TodoContext, DispatchContext } from "./Todocontext";

interface Props {
  children: ReactNode;
}

export default function TodoProvider({ children }: Props) {
  const [todos, dispatch] = useReducer(Reducer, []);

  return (
    <TodoContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodoContext.Provider>
  );
}