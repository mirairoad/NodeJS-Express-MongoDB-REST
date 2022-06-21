const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Profile'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps:true
})


const Post = mongoose.model('Post', postSchema)
module.exports = Post