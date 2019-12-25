const ACCOUNT = require("../schemas/account.schema");
const GoogleService = require("../services/googleOauth");
const analyticService = require("../services/googleAccountService");

const _ = require("lodash");

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
const GetOneByUserId = async (req, res) => {
  try {
    const accounts = await ACCOUNT.find({ userId: req.uid });
    return res.send(accounts.map(a => _.pick(a, ["name", "_id"])));
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
    let name = req.body.name;
    let userId = req.uid;

    var code = req.body.code;
    token = await GoogleService.GetRefreshToken(code);
    let account = {
      userId,
      refresh_token: token.refresh_token,
      access_token: token.access_token,
      token: token,
      name
    };
    const accountdb = await ACCOUNT.create({ ...account });
    if (accountdb._id) {
      analyticService.initialFetchAccounts(accountdb._id, userId);
    }
    return res.send(_.pick(accountdb, ["name", "_id"]));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = {
  GetAll,
  GetOneById,
  GetOneByUserId,
  UpdateById,
  Delete,
  Create
};
