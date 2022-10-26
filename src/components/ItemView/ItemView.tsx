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

    // 13.
    // Remove event listener when we want to allow scrolling in touch devices again
    itemsViewRef.current?.removeEventListener("touchmove", preventDefault);

    setDragItem(undefined);
    setDragItemCoords(undefined);
  };

  const cancelLongPress = () => {
    console.log("cancelLongPress");

    // 16.
    // User has moved, or released pointer too early, or their device has changed orientation.
    // We kill the long press timeout.
    longPressTimer && clearTimeout(longPressTimer);

    // 17.
    // Terminate event listener garbage
    elementRef.current?.removeEventListener("pointerup", cancelLongPress);
    elementRef.current?.removeEventListener("pointermove", cancelLongPress);
    elementRef.current?.removeEventListener("pointercancel", cancelLongPress);
  };

  const addLongPressCancelers = () => {
    console.log("addLongPressCancelers");

    // 15.
    // Three events can cancel a long press: up, move, and cancel
    // We add them to our element so we can clear the long press timeout if one of them happens.
    elementRef.current?.addEventListener("pointerup", cancelLongPress);
    elementRef.current?.addEventListener("pointermove", cancelLongPress);
    elementRef.current?.addEventListener("pointercancel", cancelLongPress);
  };

  const waitForLongPress = () => {
    addLongPressCancelers();

    longPressTimer = setTimeout(() => {
      console.log("User has long pressed!");

      // 18.
      // Only add certain event listeners after long press
      document.body.addEventListener("pointermove", bodyPointerMove);
      document.body.addEventListener("pointerup", bodyPointerUp);
    }, 1000);
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

    // 14.
    // Cool, but now the question is: how do we scroll in touch devices?
    // Because when you think about it, touch to scroll can always be confused with touch to drag-and-drop.
    // Solution: use long press to activate drag-and-drop in touch devices
    const coords: Coords = { x: event.clientX, y: event.clientY };

    waitForLongPress();

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
