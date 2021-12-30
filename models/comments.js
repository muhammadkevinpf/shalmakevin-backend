const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CommentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

CommentsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Comments", CommentsSchema);