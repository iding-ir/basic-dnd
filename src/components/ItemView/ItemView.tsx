import { useRef, RefObject } from "react";
import { LONG_PRESS_TIMEOUT } from "../../constants/constants";
import { useDragData } from "../../hooks/useDragData/useDragData";
import { useDragItem } from "../../hooks/useDragItem/useDragItem";
import { Coords, Item } from "../../types/types";
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
  const {
    isDragAndDropInProgress,
    setIsDragAndDropInProgress,
    setDragSource,
    setDragOver,
    setDragDestination,
  } = useDragData();
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
    setIsDragAndDropInProgress(false);
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

      const coords: Coords = { x: event.clientX, y: event.clientY };
      setDragItem(item);
      setDragItemCoords(coords);
      setDragSource(item);

      itemsViewRef.current?.addEventListener("touchmove", preventDefault);

      cancelLongPress();
    }, LONG_PRESS_TIMEOUT);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerDown", item.name);

    waitForLongPress(event);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerMove", item.name);

    isDragAndDropInProgress && setDragOver(item);
  };

  const onPointerUp = () => {
    console.log("onPointerUp", item.name);

    setDragDestination(item);
  };

  const onPointerOverEnter = () => {
    console.log("onPointerOverEnter", item.name);
  };

  const onPointerOutLeave = () => {
    console.log("onPointerOutLeave", item.name);

    setDragOver(undefined);
  };

  const onPointerCancel = () => {
    console.log("onPointerCancel", item.name);
  };

  return (
    <div
      className="item-view"
      ref={elementRef}
      onPointerOver={onPointerOverEnter}
      onPointerEnter={onPointerOverEnter}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerOut={onPointerOutLeave}
      onPointerLeave={onPointerOutLeave}
    >
      {item.name}
    </div>
  );
};
