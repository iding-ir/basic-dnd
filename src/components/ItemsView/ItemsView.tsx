import {
  useEffect,
  useRef,
  createContext,
  useContext,
  useState,
  Dispatch,
} from "react";
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

  // 22.
  // Should work, but it doesn't.
  // When dragging is in progress, logs are not as expected.
  useEffect(() => {
    // 24.
    // I added some logs here.
    // We get conflicting calls from different Item components.
    // It makes sense, dropping on item-2, is dropping out of item-1 and item-3.
    // And all of them are trying to set shared context.
    // Se, which one should we trust?
    console.log(dragSource, dragOver, dragDestination);

    if (dragSource) {
      console.log("Started dragging:", dragSource.name);
    }

    if (dragOver) {
      console.log("Dragging over:", dragOver.name);
    }

    if (dragDestination) {
      console.log("Dropped on:", dragDestination.name);
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
