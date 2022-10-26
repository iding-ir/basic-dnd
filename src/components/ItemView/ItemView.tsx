import { useRef, RefObject } from "react";
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
  const elementRef = useRef<HTMLDivElement>(null);
  let longPressTimer: NodeJS.Timer;

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

    itemsViewRef.current?.removeEventListener("touchmove", preventDefault);

    setDragItem(undefined);
    setDragItemCoords(undefined);
  };

  const cancelLongPress = () => {
    console.log("cancelLongPress");

    longPressTimer && clearTimeout(longPressTimer);

    elementRef.current?.removeEventListener("pointerup", cancelLongPress);
    elementRef.current?.removeEventListener("pointermove", cancelLongPress);
    elementRef.current?.removeEventListener("pointercancel", cancelLongPress);
  };

  const addLongPressCancelers = () => {
    console.log("addLongPressCancelers");

    elementRef.current?.addEventListener("pointerup", cancelLongPress);
    elementRef.current?.addEventListener("pointermove", cancelLongPress);
    elementRef.current?.addEventListener("pointercancel", cancelLongPress);
  };

  const waitForLongPress = (event: React.PointerEvent<HTMLDivElement>) => {
    addLongPressCancelers();

    longPressTimer = setTimeout(() => {
      console.log("User has long pressed!");

      document.body.addEventListener("pointermove", bodyPointerMove);
      document.body.addEventListener("pointerup", bodyPointerUp);

      // 19.
      // We also need to set DragItem after long press is triggered.
      // But we don't 'event' here, so I passed it as a parameter.
      const coords: Coords = { x: event.clientX, y: event.clientY };
      setDragItem(item);
      setDragItemCoords(coords);
    }, 1000);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerDown", item.name);

    itemsViewRef.current?.addEventListener("touchmove", preventDefault);

    waitForLongPress(event);
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
      ref={elementRef}
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
