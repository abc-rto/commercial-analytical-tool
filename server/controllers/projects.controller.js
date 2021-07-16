const JWT = require('jsonwebtoken');
const Project = require('../models/project');
const { JWT_SECRET } = require('../config');

module.exports = {
    newProject: async (req, res, next) => {
        // Name and Ref validated by function in helper
        console.log(req)
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
        res.status(200).json('success!');
    },
    listAllProjects: async (req, res, next) => {
        const projects = await Project.find({}, {_id:0, __v:0});
        console.log({projects: projects})
        res.json({projects: projects})
    }
}