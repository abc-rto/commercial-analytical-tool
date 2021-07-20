const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const projectsController = require('../controllers/projects.controller');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/create').post(projectsController.createProject);

router.route('/read').get(passportJWT, projectsController.readProject);

router.route('/selectAll').get(passportJWT, projectsController.listAllProjects);

router.route('/update').get(passportJWT, projectsController.updateProject);

router.route('/delete').get(passportJWT, projectsController.deleteProject);

module.exports = router;

