const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
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

const generateId = () => {
  const maxId = persons.length !== 0 ? persons.length : 0;
  return maxId + 1;
};

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

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const found = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or Number missing",
    });
  } else if (found) {
    return res.status(400).json({
      error: "Name alredy exists in the phonebook",
    });
  } else {
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);

    res.send(person);
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.sendStatus(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
