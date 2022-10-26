import { useDragItem } from "../../hooks/useDragItem/useDragItem";
import "./DragItem.css";

export const DragItem = () => {
  const { dragItem, dragItemCoords } = useDragItem();
  const style = dragItemCoords && {
    top: `${dragItemCoords.y}px`,
    left: `${dragItemCoords.x}px`,
  };

  return null;
};
