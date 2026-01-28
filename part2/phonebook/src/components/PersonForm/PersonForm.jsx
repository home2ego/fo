const PersonForm = ({ onSubmit, name, onNameChange, phone, onPhoneChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input type="text" value={name} onChange={onNameChange} required />
      </div>

      <div>
        number:{" "}
        <input type="tel" value={phone} onChange={onPhoneChange} required />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
