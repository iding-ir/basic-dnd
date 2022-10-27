import { RefObject, useEffect, useRef } from "react";
import { LONG_PRESS_TIMEOUT } from "../../constants/constants";
import { Coords, Item } from "../../types/types";

export type Data = { coords: Coords; item: Item };
export type Callback = (data: Data) => void;

export const DND = ({
  children,
  parentRef,
  childrenRef,
  item,
  onEnter,
  onDown,
  onLongPress,
  onMove,
  onMoveItem,
  onUp,
  onUpItem,
  onLeave,
}: {
  children: any;
  parentRef: RefObject<HTMLElement>;
  childrenRef: RefObject<HTMLElement>;
  item: Item;
  onEnter: Callback;
  onDown: Callback;
  onLongPress: Callback;
  onMove: Callback;
  onMoveItem: Callback;
  onUp: Callback;
  onUpItem: Callback;
  onLeave: Callback;
}) => {
  useEffect(() => {
    const element = childrenRef.current;
    let longPressTimer: NodeJS.Timer;

    if (!element) {
      return;
    }

    const getData = (event: PointerEvent) => {
      const coords: Coords = { x: event.clientX, y: event.clientY };
      const data: Data = { coords, item };

      return data;
    };

    const preventDefault = (event: Event) => {
      console.log("preventDefault");

      event.preventDefault();
    };

    const bodyPointerMove = (event: PointerEvent) => {
      console.log("bodyPointerMove");

      onMove(getData(event));
    };

    const bodyPointerUp = (event: PointerEvent) => {
      console.log("bodyPointerUp");

      document.body.removeEventListener("pointermove", bodyPointerMove);
      document.body.removeEventListener("pointerup", bodyPointerUp);

      parentRef.current?.removeEventListener("touchmove", preventDefault);

      onUp(getData(event));
    };

    const cancelLongPress = () => {
      console.log("cancelLongPress");

      longPressTimer && clearTimeout(longPressTimer);

      element.removeEventListener("pointerup", cancelLongPress);
      element.removeEventListener("pointermove", cancelLongPress);
      element.removeEventListener("pointercancel", cancelLongPress);
    };

    const addLongPressCancelers = () => {
      console.log("addLongPressCancelers");

      element.addEventListener("pointerup", cancelLongPress);
      element.addEventListener("pointermove", cancelLongPress);
      element.addEventListener("pointercancel", cancelLongPress);
    };

    const waitForLongPress = (event: PointerEvent) => {
      addLongPressCancelers();

      longPressTimer = setTimeout(() => {
        console.log("User has long pressed!");

        document.body.addEventListener("pointermove", bodyPointerMove);
        document.body.addEventListener("pointerup", bodyPointerUp);

        parentRef.current?.addEventListener("touchmove", preventDefault);

        cancelLongPress();

        onLongPress(getData(event));
      }, LONG_PRESS_TIMEOUT);
    };

    const onPointerDown = (event: PointerEvent) => {
      console.log("onPointerDown", item.name);

      waitForLongPress(event);

      // if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      //   event.currentTarget.releasePointerCapture(event.pointerId);
      // }
    };

    const onPointerMove = (event: PointerEvent) => {
      console.log("onPointerMove", item.name);

      onMoveItem(getData(event));
    };

    const onPointerUp = (event: PointerEvent) => {
      console.log("onPointerUp", item.name);

      onUpItem(getData(event));
    };

    const onPointerOverEnter = (event: PointerEvent) => {
      console.log("onPointerOverEnter", item.name);
    };

    const onPointerOutLeave = (event: PointerEvent) => {
      console.log("onPointerOutLeave", item.name);

      onLeave(getData(event));
    };

    const onPointerCancel = (event: PointerEvent) => {
      console.log("onPointerCancel", item.name);
    };

    element.addEventListener("pointerover", onPointerOverEnter);
    element.addEventListener("pointerenter", onPointerOverEnter);
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointerout", onPointerOutLeave);
    element.addEventListener("pointerleave", onPointerOutLeave);
    element.addEventListener("pointercancel", onPointerCancel);

    return () => {
      element.addEventListener("pointerover", onPointerOverEnter);
      element.addEventListener("pointerenter", onPointerOverEnter);
      element.addEventListener("pointerdown", onPointerDown);
      element.addEventListener("pointermove", onPointerMove);
      element.addEventListener("pointerup", onPointerUp);
      element.addEventListener("pointerout", onPointerOutLeave);
      element.addEventListener("pointerleave", onPointerOutLeave);
      element.addEventListener("pointercancel", onPointerCancel);
    };
  }, []);

  return children;
};
