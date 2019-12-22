const ACCOUNT = require("../schemas/account.schema");

const GetAll = async (req, res) => {
  try {
    return res.send(await ACCOUNT.find());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const GetOneById = async (req, res) => {
  try {
    return res.send(await ACCOUNT.findById(req.params.id));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const UpdateById = async (req, res) => {
  try {
    let Obj = { ...req.body };

    return res.send(
      await ACCOUNT.findOneAndUpdate({ _id: req.params.id }, Obj, { new: true })
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const Delete = async (req, res) => {
  try {
    return res.send(await ACCOUNT.remove({ _id: req.params.id }));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const Create = async (req, res) => {
  try {
    let Obj = { ...req.body };

    return res.send(await ACCOUNT.create({ ...Obj }));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = {
  GetAll,
  GetOneById,
  UpdateById,
  Delete,
  Create
};
