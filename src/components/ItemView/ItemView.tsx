import { Coords, Item } from "../App/App";
import { useDragItem } from "../DragItem/DragItem";
import "./ItemView.css";

export const ItemView = ({ item }: { item: Item }) => {
  const { setDragItem, setDragItemCoords } = useDragItem();

  const bodyPointerMove = (event: PointerEvent) => {
    console.log("bodyPointerMove");

    const coords: Coords = { x: event.clientX, y: event.clientY };

    setDragItemCoords(coords);
  };

  const bodyPointerUp = (event: PointerEvent) => {
    console.log("bodyPointerUp");

    // 5.
    // Remove all body event listeners with body "pointerup"
    document.body.removeEventListener("pointermove", bodyPointerMove);
    document.body.removeEventListener("pointerup", bodyPointerUp);
    // Also get unset DragItem
    setDragItem(undefined);
    setDragItemCoords(undefined);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerDown", item.name);

    const coords: Coords = { x: event.clientX, y: event.clientY };
    document.body.addEventListener("pointermove", bodyPointerMove);
    // 4.
    // Add an event listener to body, so that we can tell when to remove dragItem
    document.body.addEventListener("pointerup", bodyPointerUp);

    setDragItem(item);
    setDragItemCoords(coords);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerMove", item.name);
  };

  const onPointerUp = () => {
    console.log("onPointerUp", item.name);
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
