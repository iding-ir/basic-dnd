import { Coords, Item } from "../App/App";
import { useDragItem } from "../DragItem/DragItem";
import "./ItemView.css";

export const ItemView = ({ item }: { item: Item }) => {
  const { setDragItem, setDragItemCoords } = useDragItem();

  const bodyPointerMove = (event: PointerEvent) => {
    const coords: Coords = { x: event.clientX, y: event.clientY };

    // 2.
    // Coords will change as expected
    // Drag image move as expected
    // Drag image will not glitch between items
    console.log("body", coords);

    setDragItemCoords(coords);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerDown", item.name);

    const coords: Coords = { x: event.clientX, y: event.clientY };
    document.body.addEventListener("pointermove", bodyPointerMove);

    setDragItem(item);
    setDragItemCoords(coords);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerMove", item.name);

    const coords: Coords = { x: event.clientX, y: event.clientY };
    // 1.
    // Coords will not go further than Items
    // Drag image will not go far enough to the bottom
    // Drag image will also glitch between items
    console.log("item", coords);
  };

  const onPointerUp = () => {
    console.log("onPointerUp", item.name);

    // 3.
    // Will need to remove event listener from document.body when pointer is up.
    // But if we do it here, event listener will only be removed if user "pointerup" on an Item.
    // We want this do happen everywhere.
    document.body.removeEventListener("pointermove", bodyPointerMove);

    setDragItem(undefined);
    setDragItemCoords(undefined);
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
