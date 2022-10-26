import { items } from "../../constants/constants";
import { DragItem } from "../DragItem/DragItem";
import { ItemsView } from "../ItemsView/ItemsView";
import "./App.css";

export const App = () => {
  return (
    <div className="app">
      <ItemsView items={items} />

      <DragItem />
    </div>
  );
};
