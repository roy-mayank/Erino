const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ContactsModel = require("./model/contacts");

const app = express();
app.use(cors());
app.use(express.json());

const test = require("dotenv").config();
mongoose.connect(test.parsed.CONNECTION_STRING);

app.get("/contacts", (req, res) => {
  ContactsModel.find({})
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/contacts", (req, res) => {
  const { _id, firstName, lastName, email, phoneNumber, company, role } =
    req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !company || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }
  ContactsModel.create({
    _id,
    firstName,
    lastName,
    email,
    phoneNumber,
    company,
    role,
  })
    .then((contact) => res.status(201).json(contact))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/contacts/:id", (req, res) => {
  ContactsModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((contact) => res.json(contact))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/contacts/:id", (req, res) => {
  ContactsModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Contact deleted successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
