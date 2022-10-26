import { useRef, createContext, useContext, useState, Dispatch } from "react";
import { Item } from "../App/App";
import { ItemView } from "../ItemView/ItemView";
import "./ItemsView.css";

export const ItemsView = ({ items }: { items: Item[] }) => {
  const itemsViewRef = useRef<HTMLDivElement>(null);

  return (
    <DragDataProvider>
      <div className="items-view" ref={itemsViewRef}>
        {items.map((item) => (
          <ItemView key={item.name} item={item} itemsViewRef={itemsViewRef} />
        ))}
      </div>
    </DragDataProvider>
  );
};

// 21.
// Each Item component has its own implementation of drag and drop
// They can tell if drag has started on them, or ended on them.
// But they are in isolation.
// Let's solve that with React Context.
// I assume there are three important states in drag-and-drop:
// dragSource: the item that is being dragged (long pressed on).
// dragOver: the item that the pointer might be flying over during drag and drop, if any.
// dragDestination: the item that drag and drop is ended on, if any.
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
