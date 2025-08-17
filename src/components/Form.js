import { useState } from "react";

export const Form = ({ onAddItems }) => {
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
