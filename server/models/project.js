const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var AutoIncrement = require('mongoose-sequence')(mongoose);

// Create a schema
const projectSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    ref: {
        type: String,
        required: false
    }
});

projectSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});

// Create a model 
const Project = mongoose.model('project', projectSchema)

// Export the model
module.exports = Project;