const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.name}>
          {person.name} {person.phone}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
