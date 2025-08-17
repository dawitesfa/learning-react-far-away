export const PackingItem = ({ item, onDeleteItems, onTogglePacked }) => {
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
