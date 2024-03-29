import { db } from "../db.js";

export const getDB = (_, res) => {
  const query = "SELECT * FROM dados";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(200).json(data);
  });
};

export const setDB = (req, res) => {
  const query =
    "INSERT INTO dados(`dataNew`,`movimentacao`,`produto`,`quantidade`,`valor`,`total`) VALUES(?)";

  const values = [
    req.body.dataNew,
    req.body.movimentacao,
    req.body.produto,
    req.body.quantidade,
    req.body.valor,
    req.body.total,
  ];

  db.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastrado com sucesso...");
  });
};

export const updateDB = (req, res) => {
  const query =
    "UPDATE dados SET  `movimentacao` = ?, `produto` = ?, `quantidade` = ?, `valor` = ?, `total` = ? WHERE `id` = ?";
  const values = [
    req.body.movimentacao,
    req.body.produto,
    req.body.quantidade,
    req.body.valor,
    req.body.total,
  ];
  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastrado  atualizado... ");
  });
};

export const deleteDB = (req, res) => {
  const query = "DELETE FROM dados WHERE `id` = ? ";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastro deletado com Sucesso...");
  });
};
