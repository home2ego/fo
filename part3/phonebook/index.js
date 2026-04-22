require("dotenv").config();
const express = require("express");
const Person = require("./models/person");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        return res.json(person);
      }

      res.status(404).json({ error: "Person not found" });
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deletedPerson) =>
      deletedPerson
        ? res.sendStatus(204)
        : res.status(404).json({ error: "Person not found" }),
    )
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "Invalid JSON. Missing name or number" });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((savedPerson) => res.status(201).json(savedPerson))
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({ error: "Person not found" });
      }

      person.name = name;
      person.number = number;

      person.save().then((updatedPerson) => res.json(updatedPerson));
    })
    .catch((err) => next(err));
});

app.use((req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
});
app.use((err, req, res, next) => {
  console.log(err.name);

  if (err.name === "CastError") {
    res.status(400).json({ error: "Malformatted ID" });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
