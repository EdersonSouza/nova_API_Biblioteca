import { Schema, model } from "mongoose";

const CategoriaSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  livros:[{livro:{type: Schema.Types.ObjectId, ref: 'Livro' }}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model("Categoria", CategoriaSchema);