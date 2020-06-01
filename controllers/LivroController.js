import Livro from "../modelsBiblioteca/livro";

class LivroController {
  async index(req, res) {
    const livros = await Livro.find();

    return res.json(livros);
  }

  async show(req, res) {
    const { id } = req.params;
    const livro = await Livro.findById(id);

    return res.json(livro);
  }

  async store(req, res) {
    const { body } = req;
    const livro = await Livro.create(body);

    return res.json(livro);
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req; 
    const li = await Livro.findById(id);
    li.categoria.push(body.categoria);
    console.log(li.categoria)
    const livro = await Livro.findByIdAndUpdate(id, li, {
      new: true
    });

    return res.json(livro);
  }


  async destroy(req, res) {
    const { id } = req.params;

    await Livro.findByIdAndDelete(id);

    return res.send();
  }
}

export default new LivroController();