const express = require("express");
const router = express.Router();
const estudios = require("../controllers/estudios");
const creencias = require("../controllers/creencias");
const eventos = require("../controllers/eventos");
const catchAsync = require("../utils/catchAsync");
const { requireLogin, isDeletable } = require("../middleware");
const admin = require("../controllers/admin");

router
  .route("/_estudios")
  .get(catchAsync(estudios.index))
  .post(requireLogin, catchAsync(estudios.createEstudio));

router
  .route("/_estudios/:id")
  .get(catchAsync(estudios.showEstudio))
  .put(requireLogin, catchAsync(estudios.updateEstudio))
  .delete(requireLogin, isDeletable, catchAsync(estudios.deleteEstudio));

router
  .route("/_creencias")
  .get(catchAsync(creencias.showCreencias))
  .put(requireLogin, catchAsync(creencias.updateCreencias));

router
  .route("/_eventos")
  .get(catchAsync(eventos.showEventos))
  .put(requireLogin, catchAsync(eventos.updateEventos));

router.route("/_login").post(catchAsync(admin.login));

router.route("/_logout").post(admin.logout);

module.exports = router;
