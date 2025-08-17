import { useState } from "react";

export const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((prevItems) => [item, ...prevItems]);
  };

  const handleDeleteItems = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleOnTogglePacked = (id) => {
    setItems((prevItems) =>
      prevItems.map((e) => (e.id === id ? { ...e, packed: !e.packed } : e))
    );
  };

  const handleOnClearItems = () => {
    const confirmed = window.confirm(
      "Are you sure, you want to delete all the items?"
    );
    if (confirmed) setItems([]);
  };
  return (
    <div className="main-app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onTogglePacked={handleOnTogglePacked}
        onClearItems={handleOnClearItems}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <h1 className="logo-text">🏝️ Far Away 🧳</h1>
    </div>
  );
};

const Form = ({ onAddItems }) => {
  const [itemText, setItemText] = useState("");
  const [qty, setQty] = useState(1);

  const handleOnChange = (e) => {
    setItemText(e.target.value);
  };

  const handleOnQtyChange = (e) => {
    setQty(Number(e.target.value));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (itemText.length === 0) return;
    const item = {
      id: Date.now().toString(),
      name: itemText,
      packed: false,
      quantity: qty,
    };
    onAddItems(item);
    setQty(1);
    setItemText("");
  };
  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <span>What do you need for your 😍 trip?</span>
      <select value={qty} onChange={handleOnQtyChange}>
        {Array.from({ length: 20 }, (_, index) => (
          <option value={index + 1}>{index + 1}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={itemText}
        onChange={handleOnChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const PackingList = ({
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

const PackingItem = ({ item, onDeleteItems, onTogglePacked }) => {
  return (
    <div className="packing-item">
      <input
        value={item.packed}
        type="checkbox"
        onChange={(_) => {
          onTogglePacked(item.id);
        }}
      />
      <span
        className={item.packed ? "packed" : ""}
      >{`${item.quantity} ${item.name}`}</span>
      <button
        onClick={() => {
          onDeleteItems(item.id);
        }}
      >
        X
      </button>
    </div>
  );
};

const Stats = ({ items }) => {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>You have no any packing list, please add 🧳</em>
      </footer>
    );
  }
  const numOfItems = items.length;
  const numOfPackedItems = items.filter((e) => e.packed).length;
  const percentage = Math.round((numOfPackedItems / numOfItems) * 100);
  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>Congratulations you have packed all your items</em>
      ) : (
        <em>
          You have {numOfItems} items on your packing list, and you already
          packed {numOfPackedItems} ({percentage}%){" "}
        </em>
      )}
    </footer>
  );
};
