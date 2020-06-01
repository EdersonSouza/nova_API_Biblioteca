import { Schema, model } from "mongoose";

const AutorSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  livros:[{type: Schema.Types.ObjectId, ref: 'Livro'}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model("Autor", AutorSchema);