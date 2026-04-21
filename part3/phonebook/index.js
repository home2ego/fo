require("dotenv").config();
const express = require("express");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/info", (req, res) => {
  Person.countDocuments().then((count) => {
    const html = `<p>Phonebook has info for ${count} people</p>
<p>${new Date().toString()}</p>`;

    res.send(html);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        return res.json(person);
      }

      res.status(404).json({ error: "Person not found" });
    })
    .catch(() => res.status(400).json({ error: "Invalid data" }));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deletedPerson) =>
      deletedPerson
        ? res.sendStatus(204)
        : res.status(404).json({ error: "Person not found" }),
    )
    .catch(() => res.status(400).json({ error: "Invalid data" }));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "Invalid JSON. Missing name or number" });
  }

  Person.findOne({ name }).then((existingPerson) => {
    if (existingPerson) {
      return res.status(400).json({ error: "Name must be unique" });
    }

    const person = new Person({
      name,
      number,
    });

    person.save().then((savedPerson) => res.status(201).json(savedPerson));
  });
});

app.patch("/api/persons/:id", (req, res) => {
  const { number } = req.body;

  Person.findByIdAndUpdate(req.params.id, { number }, { new: true })
    .then((updatedPerson) =>
      updatedPerson
        ? res.json(updatedPerson)
        : res.status(404).json({ error: "Person not found" }),
    )
    .catch(() => res.status(400).json({ error: "Invalid data" }));
});

app.use((req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
