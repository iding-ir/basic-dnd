import { Item } from "../App/App";
import { ItemView } from "../ItemView/ItemView";
import "./ItemsView.css";

export const ItemsView = ({ items }: { items: Item[] }) => {
  return (
    <div
      className="items-view"
      onPointerMove={(event) => {
        event.preventDefault();
      }}
    >
      {items.map((item) => (
        <ItemView key={item.name} item={item} />
      ))}
    </div>
  );
};
