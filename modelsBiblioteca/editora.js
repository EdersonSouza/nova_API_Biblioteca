import { Schema, model } from "mongoose";

const EditoraSchema = new Schema({
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

export default model("Editora", EditoraSchema);