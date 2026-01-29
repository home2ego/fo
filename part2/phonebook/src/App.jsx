import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification/Notification";
import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const isUniqueName = persons.every((p) => p.name !== newName);

    if (isUniqueName) {
      const newPerson = { name: newName, number: newNumber };

      personService.create(newPerson).then((returnedPerson) => {
        setSuccessMessage(`Added ${returnedPerson.name}`);
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      });

      return;
    }

    const person = persons.find((p) => p.name === newName);
    const isUniqueNumber = person.number !== newNumber;

    if (isUniqueNumber) {
      const newPerson = { ...person, number: newNumber };

      personService
        .update(person.id, newPerson)
        .then((returnedPerson) => {
          setSuccessMessage(`Changed ${person.name} phone number`);
          setPersons(
            persons.map((p) =>
              p.id === returnedPerson.id
                ? { ...p, number: returnedPerson.number }
                : p,
            ),
          );
          setNewName("");
          setNewNumber("");

          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`,
          );

          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });

      return;
    }

    return alert(`${newName} is already added to phonebook`);
  };

  const handleDelete = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);

    if (shouldDelete) {
      personService.deleteData(person.id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== returnedPerson.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <Filter query={query} onQueryChange={(e) => setQuery(e.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        number={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
