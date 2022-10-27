import { useRef, RefObject } from "react";
import { useDragData } from "../../hooks/useDragData/useDragData";
import { useDragItem } from "../../hooks/useDragItem/useDragItem";
import { Data, DND } from "../../packages/react-easy-dnd/react-easy-dnd";
import { Item } from "../../types/types";
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

  const onEnter = (data: Data) => {
    console.log("onEnter");
  };

  const onDown = (data: Data) => {
    console.log("onDown");
  };

  const onLongPress = (data: Data) => {
    console.log("onLongPress");

    setDragItem(data.item);
    setDragItemCoords(data.coords);
    setDragSource(data.item);
  };

  const onMove = (data: Data) => {
    console.log("onMove");

    setDragItemCoords(data.coords);
  };

  const onMoveItem = (data: Data) => {
    console.log("onMoveItem");
    console.log({ isDragAndDropInProgress });

    isDragAndDropInProgress && setDragOver(data.item);
  };

  const onUp = (data: Data) => {
    console.log("onUp");

    setDragItem(undefined);
    setDragItemCoords(undefined);
    setIsDragAndDropInProgress(false);
  };

  const onUpItem = (data: Data) => {
    console.log("onUpItem");

    isDragAndDropInProgress && setDragDestination(data.item);
  };

  const onLeave = (data: Data) => {
    console.log("onLeave");

    setDragOver(undefined);
  };

  return (
    <DND
      parentRef={itemsViewRef}
      childrenRef={elementRef}
      item={item}
      onEnter={onEnter}
      onDown={onDown}
      onLongPress={onLongPress}
      onMove={onMove}
      onMoveItem={onMoveItem}
      onUp={onUp}
      onUpItem={onUpItem}
      onLeave={onLeave}
    >
      <div className="item-view" ref={elementRef}>
        {item.name}
      </div>
    </DND>
  );
};
