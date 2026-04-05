const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const html = `<p>Phonebook has info for ${persons.length} people</p>
<p>${new Date().toString()}</p>`;

  res.send(html);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    return res.json(person);
  }

  res.status(404).json({ error: "Person not found" });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const personExists = persons.some((p) => p.id === id);
  if (!personExists) {
    return res.status(404).json({ error: "Person not found" });
  }

  persons = persons.filter((p) => p.id !== id);

  res.sendStatus(204);
});

function generateId() {
  return String(Math.trunc(Math.random() * 1_000_000 + 1));
}

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const newPerson = {
    ...person,
    id: generateId(),
  };

  persons = [...persons, newPerson];

  res.status(201).json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
