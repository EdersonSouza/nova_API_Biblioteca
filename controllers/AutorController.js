import Autor from "../modelsBiblioteca/Autor";

class AutorController {
  async index(req, res) {
    const autores = await Autor.find();

    return res.json(autores);
  }

  async show(req, res) {
    const { id } = req.params;
    const autor = await Autor.findById(id);

    return res.json(autor);
  }

  async store(req, res) {
    const { body } = req;
    const autor = await Autor.create(body);

    return res.json(autor);
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    const autor = await Autor.findByIdAndUpdate(id, body, {
      new: true
    });

    return res.json(autor);
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Autor.findByIdAndDelete(id);

    return res.send();
  }
}

export default new AutorController();