const express = require("express");
const controller = require("../controllers/iscrizioniController");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:cod", controller.getByCode);
router.post("/", controller.create);
router.put("/:cod", controller.replace);
router.delete("/:cod", controller.remove);

module.exports = router;
