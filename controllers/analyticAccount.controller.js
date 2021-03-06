const ANALYTICACCOUNT = require("../schemas/analyticAccount.schema");

const analyticService = require("../services/accounts/googleAccountService");
const oauthService = require("../services/googleOauth");
const { fetchAnalyticdata } = require( "../services/accounts/fetchanalyticData");
const _ = require("lodash");

const GetAll = async (req, res) => {
  try {
    return res.send(await ANALYTICACCOUNT.find());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const GetOneById = async (req, res) => {
  try {
    return res.send(await ANALYTICACCOUNT.findById(req.params.id));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const GetOneByUserId = async (req, res) => {
  try {
    const accounts = await ANALYTICACCOUNT.find({ userId: req.uid });
    return res.send(accounts);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const UpdateById = async (req, res) => {
  try {
    let Obj = { ...req.body };

    return res.send(
      await ANALYTICACCOUNT.findOneAndUpdate({ _id: req.params.id }, Obj, {
        new: true
      })
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const Delete = async (req, res) => {
  try {
    return res.send(await ANALYTICACCOUNT.remove({ _id: req.params.id }));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const FetchAnalyticAccounts = async (req, res) => {
  try {
    const userId = req.uid;
    const accountId = req.params.accountId;
    const accounts = await ANALYTICACCOUNT.find({
      userId: userId,
      accountId: accountId
    });
    return res.send(accounts);
  } catch (error) {
    return res.status(400).send("Something Went Wrong", error);
  }
};
const FetchAnalyticdata = async (req, res) => {
  try {
  
    
    const userId = req.uid;
    const viewId = req.params.viewId;
    const accountId = req.params.accountId;

    const accounts = await ANALYTICACCOUNT.find({
      userId: userId,
      accountId: accountId
    });

    console.log('viewId',viewId);
    
    const {data} =await fetchAnalyticdata(viewId,accountId);

    
    return res.send(data);
  } catch (error) {
  

    return res.status(400).send({message:"Something Went Wrong", error});
  }
};
module.exports = {
  GetAll,
  GetOneById,FetchAnalyticdata,
  GetOneByUserId,
  UpdateById,
  Delete,
  FetchAnalyticAccounts
};
