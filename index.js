const express = require("express");
const app = express();

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const people = persons.length;
  const date = new Date();
  const info = `<div>
      <p>Phonebook has info for ${people} people</p>
      <p>${date}</p>
  </div>`;
  res.send(info);
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.send(404);
  }
});

app.delete("/api/person/:id", (req, res) => {});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
