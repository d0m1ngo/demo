const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    name: String,
    status: {
        type: String,
        enum : ['running', 'successed', 'failed'],
        default: 'running'
    },
    processId: String,
    process: {
        type: Schema.Types.ObjectId,
        ref: 'Process'
    }
}, {versionKey: false})

module.exports = mongoose.model('Job', JobSchema);