import { createContext, Dispatch, useContext, useState } from "react";
import { Coords, Item } from "../../types/types";

interface IDragItemContext {
  dragItem?: Item;
  setDragItem: Dispatch<React.SetStateAction<Item | undefined>>;
  dragItemCoords?: Coords;
  setDragItemCoords: Dispatch<React.SetStateAction<Coords | undefined>>;
}

const DragItemContext = createContext<IDragItemContext>({} as IDragItemContext);

export const useDragItem = () => useContext(DragItemContext);

export const DragItemProvider = ({ children }: { children: JSX.Element }) => {
  const [dragItem, setDragItem] = useState<Item>();
  const [dragItemCoords, setDragItemCoords] = useState<Coords>();

  return (
    <DragItemContext.Provider
      value={{ dragItem, setDragItem, dragItemCoords, setDragItemCoords }}
    >
      {children}
    </DragItemContext.Provider>
  );
};
