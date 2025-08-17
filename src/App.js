import { useState } from "react";
import { Logo } from "./components/Logo";
import { Form } from "./components/Form";
import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";

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
