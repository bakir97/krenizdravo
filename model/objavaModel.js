const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Objava = new Schema(
  {
    korisnik: {
      type: Schema.Types.ObjectId,
      ref: "korisnik"
    },
    naslov: String,
    naslovSlika: String,
    objava: String,
    like: [
      {
        korisnik: {
          type: Schema.Types.ObjectId,
          ref: "korisnik"
        }
      }
    ],
    like: [
      {
        korisnik: {
          type: Schema.Types.ObjectId,
          ref: "korisnik"
        }
      }
    ],
    unlike: [
      {
        korisnik: {
          type: Schema.Types.ObjectId,
          ref: "korisnik"
        }
      }
    ],
    omiljeneObjave: [
      {
        type: Schema.Types.ObjectId,
        ref: "korisnik"
      }
    ]
  },

  { timestamps: true }
);
mongoose.model("objava", Objava);
