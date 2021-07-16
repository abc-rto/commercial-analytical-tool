const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const projectsController = require('../controllers/projects.controller');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/newProject').post(projectsController.newProject);

router.route('/selectAll').get(passportJWT, projectsController.listAllProjects);

//router.route('/secret').get(passportJWT, usersController.secret);

module.exports = router;

