import Categoria from "../modelsBiblioteca/Categoria";

class CategoriaController {
  async index(req, res) {
    const categorias = await Categoria.find();

    return res.json(categorias);
  }

  async show(req, res) {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);

    return res.json(categoria);
  }

  async store(req, res) {
    const { body } = req;
    const categoria = await Categoria.create(body);

    return res.json(categoria);
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    const categoria = await Categoria.findByIdAndUpdate(id, body, {
      new: true
    });

    return res.json(categoria);
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Categoria.findByIdAndDelete(id);

    return res.send();
  }
}

export default new CategoriaController();