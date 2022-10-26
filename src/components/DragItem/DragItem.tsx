import { createPortal } from "react-dom";
import { useDragItem } from "../../hooks/useDragItem/useDragItem";
import "./DragItem.css";

export const DragItem = () => {
  const { dragItem, dragItemCoords } = useDragItem();
  const style = dragItemCoords && {
    top: `${dragItemCoords.y}px`,
    left: `${dragItemCoords.x}px`,
  };

  return dragItem
    ? createPortal(
        <div className="drag-item" style={style}>
          {dragItem.name}
        </div>,
        document.body
      )
    : null;
};
