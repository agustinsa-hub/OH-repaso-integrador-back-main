const S = require("sequelize");
const db = require("../db");

class Libros extends S.Model {
  static letra(letra2) {
    return Libros.findAll({
      where: {
        titulo: {
          [S.Op.startsWith]: letra2,
        },
      },
    });
  }
  findSameAuthor() {
    return Libros.findAll({
      where: {
        id: {
          [S.Op.not]: this.id,
        },
        autor: {
          [S.Op.eq]: this.autor,
        },
      },
    });
  }
}

//metodo de clase

//metodo de instancia

Libros.init(
  {
    titulo: {
      type: S.STRING,
    },
    autor: {
      type: S.STRING,
    },
    ventas: {
      type: S.BIGINT,
    },
  },
  { sequelize: db, modelName: "libros" }
);

Libros.addHook("beforeValidate", (book) => {
  if (book.ventas > 30000) {
    let tit = book.titulo;
    book.titulo = tit + " (BEST SELLER)";
  }
});

//hook

module.exports = Libros;
