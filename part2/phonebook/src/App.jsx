import { useState } from "react";
import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const isUniqueName = persons.every((person) => person.name !== newName);

    if (isUniqueName) {
      setPersons([...persons, { name: newName, phone: newPhone }]);
      setNewName("");
      setNewPhone("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter query={query} onQueryChange={(e) => setQuery(e.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        phone={newPhone}
        onPhoneChange={(e) => setNewPhone(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
