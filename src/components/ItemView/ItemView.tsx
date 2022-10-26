import { PointerEvent } from "react";
import { Coords, Item } from "../App/App";
import { useDragItem } from "../DragItem/DragItem";
import "./ItemView.css";

export const ItemView = ({ item }: { item: Item }) => {
  const { setDragItem, setDragItemCoords } = useDragItem();

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    console.log("onPointerDown", item.name);

    const coords: Coords = { x: event.clientX, y: event.clientY };

    setDragItem(item);
    setDragItemCoords(coords);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    console.log("onPointerMove", item.name);

    const coords: Coords = { x: event.clientX, y: event.clientY };
    // Coords will not go further than Items
    // Drag image will not go far enough to the bottom
    // Drag image will also glitch between items
    console.log(coords);

    setDragItemCoords(coords);
  };

  const onPointerUp = () => {
    console.log("onPointerUp", item.name);

    setDragItem(undefined);
  };

  return (
    <div
      className="item-view"
      onPointerOver={() => console.log("onPointerOver", item.name)}
      onPointerEnter={() => console.log("onPointerEnter", item.name)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => console.log("onPointerCancel", item.name)}
      onPointerOut={() => console.log("onPointerOut", item.name)}
      onPointerLeave={() => console.log("onPointerLeave", item.name)}
    >
      {item.name}
    </div>
  );
};
