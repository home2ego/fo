const Filter = ({ query, onQueryChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input type="search" value={query} onChange={onQueryChange} />
    </div>
  );
};

export default Filter;
