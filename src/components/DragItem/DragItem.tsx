import { createContext, useContext, useState, Dispatch } from "react";
import { createPortal } from "react-dom";
import { Item, Coords } from "../App/App";
import "./DragItem.css";

export const DragItem = () => {
  const { dragItem, dragItemCoords } = useDragItem();
  const style = dragItemCoords && {
    top: `${dragItemCoords.y}px`,
    left: `${dragItemCoords.x}px`,
  };

  return dragItem
    ? createPortal(
        <div className="drag-item" style={style}>
          {dragItem.name}
        </div>,
        document.body
      )
    : null;
};

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
