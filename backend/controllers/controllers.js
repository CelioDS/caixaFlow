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
    "INSERT INTO dados(`dataNew`,`movimentacao`,`descricao`,`valor`) VALUES(?)";

  const values = [
    req.body.dataNew,
    req.body.movimentacao,
    req.body.descricao,
    req.body.valor,
  ];

  db.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastrado com sucesso...");
  });
};

export const updateDB = (req, res) => {
  const query =
    "UPDATE dados SET `dataNew` = ?, `movimentacao` = ?, `descricao` = ?, `valor` = ?,";
  const values = [
    req.body.dataNew,
    req.body.movimentacao,
    req.body.descricao,
    req.body.valor,
  ];
  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cadastrado  atualizado... ");
  });
};
