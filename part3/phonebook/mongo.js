const mongoose = require("mongoose");

const password = process.argv[2];

if (!password) {
  console.log("Give password as argument");
  process.exit(1);
}

const url = `mongodb+srv://fullstack:${password}@cluster0.6ym4zx0.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

switch (process.argv.length) {
  case 3:
    Person.find({}).then((persons) => {
      console.log("phonebook:");
      persons.forEach((person) =>
        console.log(`${person.name} ${person.number}`),
      );
      mongoose.connection.close();
    });

    break;

  case 5:
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({ name, number });

    person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });

    break;
}
