import { Schema, model } from "mongoose";

const AlunoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  codigoSgde: {
    type: Number,
    required: true,
    unique:true

  },
  fones: [],
  emprestimos:[{type: Schema.Types.ObjectId, ref: 'Emprestimo'}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model("Aluno", AlunoSchema);