const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// To see what options are available : https://github.com/ranisalt/node-argon2/wiki/Options
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hash) => {
      req.body.hashedPassword = hash;

      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password, hashingOptions)
    .then((result) => {
      if (result === true) {
        const payload = { id: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.status(200).send(token);
      } else {
        res.status(404).send("Bad credentials");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  // Get token in headers
  const authorizationHeaders = req.get("Authorization");

  if (authorizationHeaders) {
    // Split token to separete "Bearer " and token part
    const [type, token] = authorizationHeaders.split(" ");

    if (type === "Bearer") {
      // Pass payload informations in request
      req.payload = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } else {
      res.status(401).send("Authorization is not of type Bearer");
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
