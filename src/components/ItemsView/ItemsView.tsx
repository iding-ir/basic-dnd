import { useRef } from "react";
import { Item } from "../App/App";
import { ItemView } from "../ItemView/ItemView";
import "./ItemsView.css";

export const ItemsView = ({ items }: { items: Item[] }) => {
  const itemsViewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="items-view" ref={itemsViewRef}>
      {items.map((item) => (
        <ItemView key={item.name} item={item} itemsViewRef={itemsViewRef} />
      ))}
    </div>
  );
};
