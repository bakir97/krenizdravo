const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatShema = new Schema(
  {
    korisnici: [],
    poruka: [
      {
        od: { type: Schema.Types.ObjectId, ref: "korisnik" },
        poruka: String,
        datum: Date
      }
    ]
  },
  { timestamps: true }
);
module.exports = mongoose.model("chat", chatShema);
