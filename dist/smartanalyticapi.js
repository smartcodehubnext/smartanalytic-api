/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * This is not a production server yet!\r\n * This is only a minimal backend to get started.\r\n **/\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst cors = __webpack_require__(/*! cors */ \"cors\");\n\nconst DBNAME = \"smartanalytics\"; //change it to your db name\n\nconst connectionString = `mongodb://localhost:27017/${DBNAME}`; //change it to your db connection String\n\nmongoose.connect(connectionString, {\n  useNewUrlParser: true\n}).then(a => {});\n\nconst userRouter = __webpack_require__(/*! ./routes/user.route */ \"./routes/user.route.js\");\n\nconst accountRouter = __webpack_require__(/*! ./routes/account.route */ \"./routes/account.route.js\");\n\nconst analyticAccountRouter = __webpack_require__(/*! ./routes/analyticAccount.route */ \"./routes/analyticAccount.route.js\");\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\napp.get(\"/api\", (req, res) => {\n  res.send({\n    message: \"Welcome to api..\"\n  });\n});\napp.get(\"/images/*\", (req, res) => {\n  res.sendFile(path.join(__dirname, req.path));\n});\napp.use(\"/api/user\", userRouter);\napp.use(\"/api/account\", accountRouter);\napp.use(\"/api/analyticAccount\", analyticAccountRouter);\nconst port = process.env.port || 3331;\nconst server = app.listen(port, () => {\n  console.log(`Listening at http://localhost:${port}/api`);\n});\nserver.on(\"error\", console.error);\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./controllers/account.controller.js":
/*!*******************************************!*\
  !*** ./controllers/account.controller.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ACCOUNT = __webpack_require__(/*! ../schemas/account.schema */ \"./schemas/account.schema.js\");\n\nconst GoogleService = __webpack_require__(/*! ../services/googleOauth */ \"./services/googleOauth.js\");\n\nconst analyticService = __webpack_require__(/*! ../services/accounts/googleAccountService */ \"./services/accounts/googleAccountService.js\");\n\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\n\nconst GetAll = async (req, res) => {\n  try {\n    return res.send((await ACCOUNT.find()));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst GetOneById = async (req, res) => {\n  try {\n    return res.send((await ACCOUNT.findById(req.params.id)));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst GetOneByUserId = async (req, res) => {\n  try {\n    const accounts = await ACCOUNT.find({\n      userId: req.uid\n    });\n    return res.send(accounts.map(a => _.pick(a, [\"name\", \"_id\"])));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst UpdateById = async (req, res) => {\n  try {\n    let Obj = { ...req.body\n    };\n    return res.send((await ACCOUNT.findOneAndUpdate({\n      _id: req.params.id\n    }, Obj, {\n      new: true\n    })));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst Delete = async (req, res) => {\n  try {\n    return res.send((await ACCOUNT.remove({\n      _id: req.params.id\n    })));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst Create = async (req, res) => {\n  try {\n    let name = req.body.name;\n    let userId = req.uid;\n    var code = req.body.code;\n    token = await GoogleService.GetRefreshToken(code);\n    console.log('token', token);\n    let account = {\n      userId,\n      refresh_token: token.refresh_token,\n      access_token: token.access_token,\n      token: token,\n      name\n    };\n    const accountdb = await ACCOUNT.create({ ...account\n    });\n\n    if (accountdb._id) {\n      analyticService.initialFetchAccounts(accountdb._id, userId);\n    }\n\n    return res.send(_.pick(accountdb, [\"name\", \"_id\"]));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nmodule.exports = {\n  GetAll,\n  GetOneById,\n  GetOneByUserId,\n  UpdateById,\n  Delete,\n  Create\n};\n\n//# sourceURL=webpack:///./controllers/account.controller.js?");

/***/ }),

/***/ "./controllers/analyticAccount.controller.js":
/*!***************************************************!*\
  !*** ./controllers/analyticAccount.controller.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ANALYTICACCOUNT = __webpack_require__(/*! ../schemas/analyticAccount.schema */ \"./schemas/analyticAccount.schema.js\");\n\nconst analyticService = __webpack_require__(/*! ../services/accounts/googleAccountService */ \"./services/accounts/googleAccountService.js\");\n\nconst oauthService = __webpack_require__(/*! ../services/googleOauth */ \"./services/googleOauth.js\");\n\nconst {\n  fetchAnalyticdata\n} = __webpack_require__(/*! ../services/accounts/fetchanalyticData */ \"./services/accounts/fetchanalyticData.js\");\n\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\n\nconst GetAll = async (req, res) => {\n  try {\n    return res.send((await ANALYTICACCOUNT.find()));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst GetOneById = async (req, res) => {\n  try {\n    return res.send((await ANALYTICACCOUNT.findById(req.params.id)));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst GetOneByUserId = async (req, res) => {\n  try {\n    const accounts = await ANALYTICACCOUNT.find({\n      userId: req.uid\n    });\n    return res.send(accounts);\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst UpdateById = async (req, res) => {\n  try {\n    let Obj = { ...req.body\n    };\n    return res.send((await ANALYTICACCOUNT.findOneAndUpdate({\n      _id: req.params.id\n    }, Obj, {\n      new: true\n    })));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst Delete = async (req, res) => {\n  try {\n    return res.send((await ANALYTICACCOUNT.remove({\n      _id: req.params.id\n    })));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst FetchAnalyticAccounts = async (req, res) => {\n  try {\n    const userId = req.uid;\n    const accountId = req.params.accountId;\n    const accounts = await ANALYTICACCOUNT.find({\n      userId: userId,\n      accountId: accountId\n    });\n    return res.send(accounts);\n  } catch (error) {\n    return res.status(400).send(\"Something Went Wrong\", error);\n  }\n};\n\nconst FetchAnalyticdata = async (req, res) => {\n  try {\n    const userId = req.uid;\n    const viewId = req.params.viewId;\n    const accountId = req.params.accountId;\n    const accounts = await ANALYTICACCOUNT.find({\n      userId: userId,\n      accountId: accountId\n    });\n    console.log('viewId', viewId);\n    const {\n      data\n    } = await fetchAnalyticdata(viewId, accountId);\n    return res.send(data);\n  } catch (error) {\n    return res.status(400).send({\n      message: \"Something Went Wrong\",\n      error\n    });\n  }\n};\n\nmodule.exports = {\n  GetAll,\n  GetOneById,\n  FetchAnalyticdata,\n  GetOneByUserId,\n  UpdateById,\n  Delete,\n  FetchAnalyticAccounts\n};\n\n//# sourceURL=webpack:///./controllers/analyticAccount.controller.js?");

/***/ }),

/***/ "./controllers/user.controller.js":
/*!****************************************!*\
  !*** ./controllers/user.controller.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const USER = __webpack_require__(/*! ../schemas/user.schema */ \"./schemas/user.schema.js\");\n\nconst ACCOUNT = __webpack_require__(/*! ../schemas/account.schema */ \"./schemas/account.schema.js\");\n\nconst {\n  sign\n} = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nconst {\n  pick\n} = __webpack_require__(/*! lodash */ \"lodash\");\n\nconst ENV_SECRET_STRING = \"SmartAnalytic\";\n\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nconst salt = bcrypt.genSaltSync(Math.random());\n\nconst {\n  google\n} = __webpack_require__(/*! googleapis */ \"googleapis\");\n\nconst GoogleService = __webpack_require__(/*! ../services/googleOauth */ \"./services/googleOauth.js\");\n\nconst GenerateHash = async password => {\n  return await bcrypt.hash(password, salt);\n};\n\nconst VerifyHash = async (password, encrypted) => {\n  return await bcrypt.compare(password, encrypted);\n};\n\nconst Authenticate = async (req, res) => {\n  const email = req.body[\"email\"];\n  const user = await USER.findOne({\n    email\n  });\n  if (!user) return res.status(400).send({\n    message: \"No user Found \"\n  });\n  const password = req.body.password;\n  const result = await VerifyHash(password, user.password);\n  if (!result) return res.status(400).send({\n    message: \"Wrong password\"\n  });\n  const payload = { ...pick(user, [\"name\", \"email\", \"emailConfirmed\", \"_id\"])\n  };\n  const token = sign(payload, ENV_SECRET_STRING);\n  res.send({ ...payload,\n    token\n  });\n};\n\nconst GetAll = async (req, res) => {\n  try {\n    return res.send((await USER.find()));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst GetOneById = async (req, res) => {\n  try {\n    return res.send((await USER.findById(req.params.id)));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst UpdateById = async (req, res) => {\n  try {\n    let Obj = { ...req.body\n    };\n    return res.send((await USER.findOneAndUpdate({\n      _id: req.params.id\n    }, Obj, {\n      new: true\n    })));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst Delete = async (req, res) => {\n  try {\n    return res.send((await USER.remove({\n      _id: req.params.id\n    })));\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst Create = async (req, res) => {\n  try {\n    let Obj = { ...req.body\n    }; //By Default we are hashing the password and storing\n    //if you want your password to be stored as it is\n    //jus delete the code  bellow of section hash password\n    //hash password\n\n    const hasPassword = await GenerateHash(Obj.password); //we will just manipulate the password in reqbody\n    //so that if you comment this then also it will work\n\n    Obj.password = hasPassword;\n    Obj.emailConfirmed = false;\n    const user = await USER.create({ ...Obj\n    });\n    await SendConfirmationEmail(user); //hash password end\n\n    return res.send({\n      Message: \"User Created Redirect to login\",\n      email: user.email,\n      _id: user._id\n    });\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst GetAuthUrl = async (req, res) => {\n  try {\n    url = GoogleService.GetAuthUrl();\n    res.send({\n      url: url\n    });\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst SaveAccount = async (req, res) => {\n  try {\n    var code = req.body.code;\n    token = await GoogleService.GetRefreshToken(code);\n    res.send({\n      url: url\n    });\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst FetchAccounts = async (req, res) => {\n  try {\n    var code = req.body.code;\n    token = await GoogleService.GetRefreshToken(code);\n    res.send({\n      url: url\n    });\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst ResendEmail = async (req, res) => {\n  try {\n    var {\n      _id,\n      email\n    } = req.body;\n    await SendConfirmationEmail(req.body);\n    res.send(\"Mail Sent\");\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst VerifyEmail = async (req, res) => {\n  try {\n    var code = req.body.code;\n    const user = await USER.findById(code);\n    await USER.update({\n      _id: code\n    }, {\n      $set: {\n        emailConfirmed: true\n      }\n    });\n    res.send(\"Email Verified\");\n  } catch (error) {\n    return res.status(400).send(error.message);\n  }\n};\n\nconst SendConfirmationEmail = async ({\n  _id,\n  email\n}) => {\n  console.log(_id, email);\n\n  const sgMail = __webpack_require__(/*! @sendgrid/mail */ \"@sendgrid/mail\");\n\n  const url = `https://launchpad.smartanalytics.tech/verify-email/?code=${_id}`;\n  sgMail.setApiKey(\"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\");\n  const msg = {\n    to: email,\n    from: \"admin@smartcodehub.com\",\n    subject: \"🔥 Confirmation Email for smartAnalytics\",\n    text: \"🔥 Confirmation Email for smartAnalytics\",\n    html: `<a href='${url}'>Click Here</a> To Activate your account`\n  };\n  await sgMail.send(msg);\n};\n\nmodule.exports = {\n  Authenticate,\n  GetAll,\n  GetOneById,\n  UpdateById,\n  Delete,\n  Create,\n  GetAuthUrl,\n  SaveAccount,\n  FetchAccounts,\n  VerifyEmail,\n  ResendEmail\n};\n\n//# sourceURL=webpack:///./controllers/user.controller.js?");

/***/ }),

/***/ "./routes/account.route.js":
/*!*********************************!*\
  !*** ./routes/account.route.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst accountController = __webpack_require__(/*! ../controllers/account.controller */ \"./controllers/account.controller.js\");\n\nconst router = express.Router();\n\nconst {\n  verify\n} = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nconst ENV_SECRET_STRING = \"SmartAnalytic\";\n\nconst authMiddleware = (req, res, next) => {\n  const token = req.header(\"authorization\");\n  if (!token) return res.status(401).send(\"UnAuthorized\");\n  const payLoad = verify(token, ENV_SECRET_STRING);\n  req.payLoad = payLoad;\n  req.uid = payLoad._id;\n  if (!payLoad) return res.status(401).send(\"UnAuthorized\");\n  next();\n};\n\nrouter.route(\"/GetByUser\").get(authMiddleware, accountController.GetOneByUserId);\nrouter.route(\"/\").get(authMiddleware, accountController.GetAll).post(authMiddleware, accountController.Create);\nrouter.route(\"/:id\").get(authMiddleware, accountController.GetOneById).put(authMiddleware, accountController.UpdateById).delete(authMiddleware, accountController.Delete);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/account.route.js?");

/***/ }),

/***/ "./routes/analyticAccount.route.js":
/*!*****************************************!*\
  !*** ./routes/analyticAccount.route.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst analyticAccountController = __webpack_require__(/*! ../controllers/analyticAccount.controller */ \"./controllers/analyticAccount.controller.js\");\n\nconst router = express.Router();\n\nconst {\n  verify\n} = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nconst ENV_SECRET_STRING = \"SmartAnalytic\";\n\nconst authMiddleware = (req, res, next) => {\n  const token = req.header(\"authorization\");\n  console.log(token);\n  if (!token) return res.status(401).send(\"UnAuthorized\");\n  const payLoad = verify(token, ENV_SECRET_STRING);\n  req.payLoad = payLoad;\n  req.uid = payLoad._id;\n  if (!payLoad) return res.status(401).send(\"UnAuthorized\");\n  next();\n};\n\nrouter.route(\"/GetByUser\").get(authMiddleware, analyticAccountController.GetOneByUserId);\nrouter.route(\"/fetchAccounts/:accountId\").get(authMiddleware, analyticAccountController.FetchAnalyticAccounts);\nrouter.route(\"/\").get(authMiddleware, analyticAccountController.GetAll);\nrouter.route(\"/:id\").get(authMiddleware, analyticAccountController.GetOneById).delete(authMiddleware, analyticAccountController.Delete);\nrouter.route(\"/fetchAnalyticdata/:viewId/:accountId\").get(authMiddleware, analyticAccountController.FetchAnalyticdata);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/analyticAccount.route.js?");

/***/ }),

/***/ "./routes/user.route.js":
/*!******************************!*\
  !*** ./routes/user.route.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst userController = __webpack_require__(/*! ../controllers/user.controller */ \"./controllers/user.controller.js\");\n\nconst router = express.Router();\nrouter.route(\"/GetAuthUrl\").get(userController.GetAuthUrl);\nrouter.route(\"/VerifyEmail\").post(userController.VerifyEmail);\nrouter.route(\"/ResendEmail\").post(userController.ResendEmail);\nrouter.route(\"/\").get(userController.GetAll).post(userController.Create);\nrouter.route(\"/login\").post(userController.Authenticate);\nrouter.route(\"/:id\").get(userController.GetOneById).put(userController.UpdateById).delete(userController.Delete);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/user.route.js?");

/***/ }),

/***/ "./schemas/account.schema.js":
/*!***********************************!*\
  !*** ./schemas/account.schema.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst accountSchema = new mongoose.Schema({\n  userId: {\n    type: \"String\"\n  },\n  name: {\n    type: \"String\"\n  },\n  refresh_token: {\n    type: \"String\"\n  },\n  token: {\n    type: \"Mixed\"\n  },\n  access_token: {\n    type: \"String\"\n  },\n  createdOn: {\n    type: \"Date\",\n    default: new Date()\n  },\n  updatedOn: {\n    type: \"Date\",\n    default: new Date()\n  }\n});\nmodule.exports = mongoose.model(\"account\", accountSchema);\n\n//# sourceURL=webpack:///./schemas/account.schema.js?");

/***/ }),

/***/ "./schemas/analyticAccount.schema.js":
/*!*******************************************!*\
  !*** ./schemas/analyticAccount.schema.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst analyticAccountSchema = new mongoose.Schema({\n  userId: {\n    type: \"String\"\n  },\n  accountId: {\n    type: \"String\"\n  },\n  id: {\n    type: \"String\"\n  },\n  kind: {\n    type: \"String\"\n  },\n  name: {\n    type: \"String\"\n  },\n  webProperties: {\n    type: [\"Mixed\"]\n  }\n});\nmodule.exports = mongoose.model(\"analyticAccount\", analyticAccountSchema);\n\n//# sourceURL=webpack:///./schemas/analyticAccount.schema.js?");

/***/ }),

/***/ "./schemas/user.schema.js":
/*!********************************!*\
  !*** ./schemas/user.schema.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst userSchema = new mongoose.Schema({\n  name: {\n    type: \"String\"\n  },\n  email: {\n    lowercase: true,\n    required: true,\n    unique: true,\n    type: \"String\"\n  },\n  password: {\n    type: \"String\"\n  },\n  isTermAggred: {\n    type: \"Boolean\",\n    default: false\n  },\n  emailConfirmed: {\n    type: \"Boolean\",\n    default: false\n  },\n  createdOn: {\n    type: \"Date\",\n    default: new Date()\n  }\n});\nmodule.exports = mongoose.model(\"user\", userSchema);\n\n//# sourceURL=webpack:///./schemas/user.schema.js?");

/***/ }),

/***/ "./services/accounts/fetchanalyticData.js":
/*!************************************************!*\
  !*** ./services/accounts/fetchanalyticData.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ANALYTICACCOUNT = __webpack_require__(/*! ../../schemas/analyticAccount.schema */ \"./schemas/analyticAccount.schema.js\");\n\nconst ACCOUNT = __webpack_require__(/*! ../../schemas/account.schema */ \"./schemas/account.schema.js\");\n\nconst axios = __webpack_require__(/*! axios */ \"axios\");\n\nconst moment = __webpack_require__(/*! moment */ \"moment\");\n\nconst oauthService = __webpack_require__(/*! ../googleOauth */ \"./services/googleOauth.js\");\n\nasync function fetchAnalyticdata(viewId, accountId) {\n  console.log('inside it');\n\n  try {\n    const accounts = await ACCOUNT.findById(accountId);\n    const matrices = ['ga:users', 'ga:percentNewSessions', 'ga:bounces', 'ga:organicSearches', 'ga:impressions', 'ga:adClicks', 'ga:pageviews', 'ga:avgTimeOnPage'];\n    const response = await axios({\n      method: \"get\",\n      headers: {\n        Authorization: `Bearer ${accounts.access_token}`\n      },\n      params: {\n        \"ids\": `ga:${viewId}`,\n        \"start-date\": 'yesterday',\n        \"end-date\": \"today\",\n        \"metrics\": matrices.join(),\n        'access_token': accounts.access_token\n      },\n      url: \"https://www.googleapis.com/analytics/v3/data/ga\"\n    });\n    console.log(response);\n    return response;\n  } catch (error) {\n    console.log(error);\n\n    if (error.response && error.response.status == 401) {\n      //refresh the token\n      const status = await oauthService.GetNewTokenFromRefreshToken(accountId);\n      console.log(status);\n      if (status) return fetchAnalyticdata(viewId, accountId);\n    }\n\n    return error;\n  }\n}\n\nmodule.exports = {\n  fetchAnalyticdata\n};\n\n//# sourceURL=webpack:///./services/accounts/fetchanalyticData.js?");

/***/ }),

/***/ "./services/accounts/googleAccountService.js":
/*!***************************************************!*\
  !*** ./services/accounts/googleAccountService.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ANALYTICACCOUNT = __webpack_require__(/*! ../../schemas/analyticAccount.schema */ \"./schemas/analyticAccount.schema.js\");\n\nconst ACCOUNT = __webpack_require__(/*! ../../schemas/account.schema */ \"./schemas/account.schema.js\");\n\nconst axios = __webpack_require__(/*! axios */ \"axios\");\n\nasync function initialFetchAccounts(accountId, userId, iscalledWithRefeshToken = false) {\n  try {\n    const analyticsAccountsresponse = await fetchAccounts(accountId);\n\n    if (analyticsAccountsresponse.data && analyticsAccountsresponse.data.items && analyticsAccountsresponse.data.items.length) {\n      accounts = analyticsAccountsresponse.data.items.map(a => {\n        a.userId = userId;\n        a.accountId = accountId;\n        return a;\n      });\n      await ANALYTICACCOUNT.insertMany(accounts, {\n        ordered: false\n      });\n      return true;\n    }\n\n    return true;\n  } catch (error) {\n    if (error.response && error.response.status == 401 && !iscalledWithRefeshToken) {\n      //refresh the token\n      const status = await oauthService.GetNewTokenFromRefreshToken(req.params.accountId);\n      console.log(status);\n      if (status) return initialFetchAccounts(accountId, userId, true);\n    }\n\n    return false;\n  }\n}\n\nasync function fetchAccounts(accountId) {\n  try {\n    const accounts = await ACCOUNT.findById(accountId);\n    return axios({\n      method: \"get\",\n      headers: {\n        Authorization: `Bearer ${accounts.access_token}`\n      },\n      params: {\n        \"max-results\": 1000,\n        \"start-index\": 1\n      },\n      url: \"https://www.googleapis.com/analytics/v3/management/accountSummaries\"\n    });\n  } catch (error) {\n    return error;\n  }\n}\n\nasync function GetAccounts(uid) {\n  try {\n    return await ANALYTICACCOUNT.findOne({\n      userId: req.uid\n    });\n  } catch (error) {\n    return error;\n  }\n}\n\nmodule.exports = {\n  fetchAccounts,\n  initialFetchAccounts,\n  GetAccounts\n};\n\n//# sourceURL=webpack:///./services/accounts/googleAccountService.js?");

/***/ }),

/***/ "./services/googleOauth.js":
/*!*********************************!*\
  !*** ./services/googleOauth.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  google\n} = __webpack_require__(/*! googleapis */ \"googleapis\");\n\nconst apiKey = \"AIzaSyBu2192g8DMLxyqqUjAAjUftAVRC0Z8kHQ\";\n\nconst ACCOUNT = __webpack_require__(/*! ../schemas/account.schema */ \"./schemas/account.schema.js\");\n\nconst client_Id = \"947832678194-dcii7ontasu96adh99df31a23cah03hj.apps.googleusercontent.com\";\nconst clientSecret = \"6srJIUfNhSE7OAbImSgbvUNx\";\nconst prodRedirect = \"https://launchpad.smartanalytics.tech/redirect\";\nconst devRedirect = \"http://localhost:3000/redirect\";\nconst oauth2Client = new google.auth.OAuth2(client_Id, clientSecret, prodRedirect);\nconst scopes = [\"https://www.googleapis.com/auth/analytics.readonly\"];\n\nconst GetAuthUrl = () => {\n  return oauth2Client.generateAuthUrl({\n    access_type: \"offline\",\n    scope: scopes\n  });\n};\n\nconst GetRefreshToken = async code => {\n  console.log(code);\n  const {\n    tokens\n  } = await oauth2Client.getToken(code);\n  return tokens;\n};\n\nconst GetNewTokenFromRefreshToken = async accountId => {\n  //get account and refreshtoken of the user\n  try {\n    const account = await ACCOUNT.findById(accountId);\n    oauth2Client.setCredentials({\n      refresh_token: account.refresh_token\n    });\n    const {\n      token\n    } = await oauth2Client.getAccessToken();\n    account.access_token = token;\n    await ACCOUNT.findByIdAndUpdate(accountId, account);\n    return true;\n  } catch (error) {\n    console.log(error);\n    return false;\n  }\n};\n\nmodule.exports = {\n  GetAuthUrl,\n  GetRefreshToken,\n  GetNewTokenFromRefreshToken\n};\n\n//# sourceURL=webpack:///./services/googleOauth.js?");

/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@sendgrid/mail\");\n\n//# sourceURL=webpack:///external_%22@sendgrid/mail%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"googleapis\");\n\n//# sourceURL=webpack:///external_%22googleapis%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });