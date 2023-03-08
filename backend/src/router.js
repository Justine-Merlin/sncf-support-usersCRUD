const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

// routes for ITEM ressource
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// routes for USER ressource

module.exports = router;
