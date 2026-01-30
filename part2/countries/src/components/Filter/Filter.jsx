const Filter = ({ query, onChange }) => {
  return (
    <div>
      Find countries <input type="search" value={query} onChange={onChange} />
    </div>
  );
};

export default Filter;
