const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcessSchema = new Schema({
    name: String,
    startTime: Date,
    jobsCount: Number,
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }]
}, {versionKey: false})

module.exports = mongoose.model('Process', ProcessSchema);