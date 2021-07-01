const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const uploadController = require('../controllers/upload.controller');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/post').post(passportJWT, uploadController.post);
router.route('/inverters').get(passportJWT, uploadController.getInverterLabels);
router.route('/files').get(passportJWT, uploadController.getFilesList);

module.exports = router;

