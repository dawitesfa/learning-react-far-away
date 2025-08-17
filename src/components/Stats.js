export const Stats = ({ items }) => {
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
