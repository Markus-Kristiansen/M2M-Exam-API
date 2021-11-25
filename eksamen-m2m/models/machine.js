const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
  topic: {
    type: String,
    required: [true, "topic has to be part of the request."],
  },
  sodaArray: [
    {
      cola: {
        type: Number,
        required: [true, "Every machine has to stock cola."],
      },
      fanta: {
        type: Number,
        required: [false, "Not every machine needs to stock fanta."],
      },
    },
  ],
  sodaMachineId: {
    type: Number,
    required: [true, "A machine has to have their own unique machine ID."],
  },
  timestamp: { type: Date, default: Date.now },
});

const Machine = mongoose.model("machine", MachineSchema);

module.exports = Machine;
