const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

// routes for ITEM ressource
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userController = require("./controllers/userControllers");
const { hashPassword } = require("./services/auth");

// routes for USER ressource
router.get("/users", userController.browse);
router.post("/users", hashPassword, userController.add);
// TODO: try to manage update, delete and read

module.exports = router;
