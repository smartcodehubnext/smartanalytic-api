const USER = require("../schemas/user.schema");

const { sign } = require("jsonwebtoken");
const { pick } = require("lodash");
const ENV_SECRET_STRING = "SmartAnalytic";

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(Math.random());

const { google } = require("googleapis");
const GoogleService = require("../services/googleOauth");

const GenerateHash = async password => {
  return await bcrypt.hash(password, salt);
};
const VerifyHash = async (password, encrypted) => {
  return await bcrypt.compare(password, encrypted);
};

const Authenticate = async (req, res) => {
  const email = req.body["email"];

  const user = await USER.findOne({ email });

  if (!user) return res.status(400).send({ message: "No user Found " });

  const password = req.body.password;
  const result = await VerifyHash(password, user.password);
  if (!result) return res.status(400).send({ message: "Wrong password" });

  const payload = {
    ...pick(user, ["name", "email", "emailConfirmed"])
  };

  const token = sign(payload, ENV_SECRET_STRING);
  res.send({ ...payload, token });
};

const GetAll = async (req, res) => {
  try {
    return res.send(await USER.find());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const GetOneById = async (req, res) => {
  try {
    return res.send(await USER.findById(req.params.id));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const UpdateById = async (req, res) => {
  try {
    let Obj = { ...req.body };

    return res.send(
      await USER.findOneAndUpdate({ _id: req.params.id }, Obj, { new: true })
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const Delete = async (req, res) => {
  try {
    return res.send(await USER.remove({ _id: req.params.id }));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const Create = async (req, res) => {
  try {
    let Obj = { ...req.body };

    //By Default we are hashing the password and storing
    //if you want your password to be stored as it is
    //jus delete the code  bellow of section hash password

    //hash password

    const hasPassword = await GenerateHash(Obj.password);
    //we will just manipulate the password in reqbody
    //so that if you comment this then also it will work
    Obj.password = hasPassword;
    Obj.emailConfirmed = false;
    const user = await USER.create({ ...Obj });
    await SendConfirmationEmail(user);
    //hash password end
    return res.send({
      Message: "User Created Redirect to login",
      email: user.email
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const GetAuthUrl = async (req, res) => {
  try {
    url = GoogleService.GetAuthUrl();
    res.send({ url: url });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const GetRefreshToken = async (req, res) => {
  try {
    var code = req.body.code;
    token = await GoogleService.GetRefreshToken(code);

    res.send({ url: url });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const ResendEmail = async (req, res) => {
  try {
    var { _id, email } = req.body;
    await SendConfirmationEmail(req.body);

    res.send("Mail Sent");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const VerifyEmail = async (req, res) => {
  try {
    var code = req.body.code;
    const user = await USER.findById(code);
    await USER.update(
      { _id: code },
      {
        $set: {
          emailConfirmed: true
        }
      }
    );
    res.send("Email Verified");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const SendConfirmationEmail = async ({ _id, email }) => {
  console.log(_id, email);

  const sgMail = require("@sendgrid/mail");
  const url = `https://www.smartanalytics.tech/verify-email/?code=${_id}`;
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: email,
    from: "admin@smartcodehub.com",
    subject: "🔥 Confirmation Email for smartAnalytics",
    text: "🔥 Confirmation Email for smartAnalytics",
    html: `<a href='${url}'>Click Here</a> To Activate your account`
  };
  await sgMail.send(msg);
};
module.exports = {
  Authenticate,
  GetAll,
  GetOneById,
  UpdateById,
  Delete,
  Create,
  GetAuthUrl,
  GetRefreshToken,
  VerifyEmail,
  ResendEmail
};
