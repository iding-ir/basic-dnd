import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { Item } from "../../types/types";

interface IDragDataContext {
  dragSource?: Item;
  setDragSource: Dispatch<React.SetStateAction<Item | undefined>>;
  dragOver?: Item;
  setDragOver: Dispatch<React.SetStateAction<Item | undefined>>;
  dragDestination?: Item;
  setDragDestination: Dispatch<React.SetStateAction<Item | undefined>>;
}

const DragDataContext = createContext<IDragDataContext>({} as IDragDataContext);

export const useDragData = () => useContext(DragDataContext);

export const DragDataProvider = ({ children }: { children: JSX.Element }) => {
  const [dragSource, setDragSource] = useState<Item>();
  const [dragOver, setDragOver] = useState<Item>();
  const [dragDestination, setDragDestination] = useState<Item>();

  useEffect(() => {
    if (dragSource) {
      console.log("---- Started dragging:", dragSource.name);
    }

    if (dragOver) {
      console.log("---- Dragging over:", dragOver.name);
    }

    if (dragDestination) {
      console.log("---- Dropped on:", dragDestination.name);
    }

    if (dragSource && dragOver && dragDestination) {
      console.log(
        "---- Resetting",
        dragSource.name,
        dragOver.name,
        dragDestination.name
      );

      setDragSource(undefined);
      setDragOver(undefined);
      setDragDestination(undefined);
    }
  }, [dragSource, dragOver, dragDestination]);

  return (
    <DragDataContext.Provider
      value={{
        dragSource,
        setDragSource,
        dragOver,
        setDragOver,
        dragDestination,
        setDragDestination,
      }}
    >
      {children}
    </DragDataContext.Provider>
  );
};
