const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'Region'],
        unique: true
    },
    cust:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Customer',
    }]
});

module.exports = mongoose.model("Region", regionSchema);