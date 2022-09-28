const librosRouter = require("express").Router();
const Libros = require("../models/libros");

librosRouter.get("/", (req, res) => {
  Libros.findAll().then((libros) => res.status(200).send(libros));
});

librosRouter.get("/:letra", (req, res) => {
  let letrita = req.params.letra;
  Libros.letra(letrita).then((lib) => res.status(200).send(lib));
});

librosRouter.get("/:id/similar", (req, res, next) => {
  Libros.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((book) => {
      if (!book) next("No se encontro ese libro");
      return book.findSameAuthor();
    })
    .then((similarBooks) => {
      return res.send(similarBooks);
    })
    .catch(next);
});

// ruta get one

librosRouter.post("/", (req, res) => {
  Libros.create(req.body).then((libros) => res.status(201).send(libros));
});
//ruta put
librosRouter.put("/:id", (req, res) => {
  Libros.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  }).then(([filasCamb, libros]) => {
    res.send(libros);
  });
});
//ruta delete

module.exports = librosRouter;
