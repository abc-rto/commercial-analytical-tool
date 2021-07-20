const JWT = require('jsonwebtoken');
const Project = require('../models/project');
const { JWT_SECRET } = require('../config');

module.exports = {
    createProject: async (req, res, next) => {
        // Name and Ref validated by function in helper
        const { name, ref } = req.body;
        // Check if there is a Project with the same name
        const foundProject = await Project.findOne({ name });
        if( foundProject ){ 
            return res.status(403).json({error: 'Project name in use, please chose a different name'});
        }
        // Create a new Project
        const newProject = new Project({ name, ref });
        await newProject.save();
        // Respond with token
        res.status(200).json('Project created!');
    },
    readProject: async (req, res, next) => {
        const id = req.body;
        const project = await Project.find({id: id}, {_id:0, __v:0});
        console.log({projects: projects})
        res.json({projects: projects})
    },
    listAllProjects: async (req, res, next) => {
        const projects = await Project.find({}, {_id:0, __v:0});
        console.log({projects: projects})
        res.json({projects: projects})
    },
    updateProject: async (req, res, next) => {
        const { name, ref, id } = req.query.form;
        await Project.findOneAndUpdate({id: id}, {name: name, ref: ref})
        res.status(200).json('Project updated!');
    },
    deleteProject: async (req, res, next) => {
        const id = req.query.id;
        const projects = await Project.deleteOne({id: id});
        res.status(200).json('Project deleted!');

    }
}