import { useState } from "react";
import { PackingItem } from "./PackingItem";

export const PackingList = ({
  items,
  onDeleteItems,
  onTogglePacked,
  onClearItems,
}) => {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = items;
  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="packing-list-section">
      <div className="packing-list">
        {sortedItems.map((e, _) => (
          <PackingItem
            key={e.id}
            item={e}
            onDeleteItems={onDeleteItems}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </div>
      <div className="list-mod">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        &emsp;
        <button onClick={onClearItems} disabled={items.length === 0}>
          Clear List
        </button>
      </div>
    </div>
  );
};
