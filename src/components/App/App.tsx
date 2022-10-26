import { DragItem } from "../DragItem/DragItem";
import { ItemsView } from "../ItemsView/ItemsView";
import "./App.css";

export type Coords = { x: number; y: number };
export type Item = {
  name: string;
};

const items: Item[] = [
  { name: "item 1" },
  { name: "item 2" },
  { name: "item 3" },
  { name: "item 4" },
  { name: "item 5" },
  { name: "item 6" },
];

export const App = () => {
  return (
    <div className="app">
      <ItemsView items={items} />

      <DragItem />
    </div>
  );
};
