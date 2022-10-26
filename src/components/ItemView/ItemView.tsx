import { RefObject } from "react";
import { Coords, Item } from "../App/App";
import { useDragItem } from "../DragItem/DragItem";
import "./ItemView.css";

export const ItemView = ({
  item,
  itemsViewRef,
}: {
  item: Item;
  itemsViewRef: RefObject<HTMLDivElement>;
}) => {
  const { setDragItem, setDragItemCoords } = useDragItem();

  const preventDefault = (event: Event) => {
    console.log("preventDefault");

    event.preventDefault();
  };

  const bodyPointerMove = (event: PointerEvent) => {
    console.log("bodyPointerMove");

    const coords: Coords = { x: event.clientX, y: event.clientY };

    setDragItemCoords(coords);
  };

  const bodyPointerUp = (event: PointerEvent) => {
    console.log("bodyPointerUp");

    document.body.removeEventListener("pointermove", bodyPointerMove);
    document.body.removeEventListener("pointerup", bodyPointerUp);

    // 13.
    // Remove event listener when we want to allow scrolling in touch devices again
    itemsViewRef.current?.removeEventListener("touchmove", preventDefault);

    setDragItem(undefined);
    setDragItemCoords(undefined);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerDown", item.name);

    // 12.
    // Only prevent default when pointerdown is triggered
    // It's interesting that what should be prevented is 'touchmove', not 'pointermove'
    itemsViewRef.current?.addEventListener("touchmove", preventDefault);

    // Tested it on:
    // Chrome desktop: works fine
    // Chrome desktop touch simulation: works fine
    // Chrome on android: dragging works fine, but now I cannot scroll.
    // Makes sense. Need to prevent default only when dragging is in progress
    const coords: Coords = { x: event.clientX, y: event.clientY };
    document.body.addEventListener("pointermove", bodyPointerMove);
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
      onPointerCancel={() => {
        console.log("onPointerCancel", item.name);
      }}
      onPointerOut={() => console.log("onPointerOut", item.name)}
      onPointerLeave={() => console.log("onPointerLeave", item.name)}
    >
      {item.name}
    </div>
  );
};
