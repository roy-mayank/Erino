const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
});

const ContactsModel = mongoose.model("contacts", contactSchema);
module.exports = ContactsModel;
