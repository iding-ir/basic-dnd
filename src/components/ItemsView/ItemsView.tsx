import { useRef } from "react";
import { DragDataProvider } from "../../hooks/useDragData/useDragData";
import { Item } from "../../types/types";
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
