const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    profile_name:{
        type:String,
        required: true,
        trim: true
    },
    profile_bio: {
        type: String
    },
    profile_job: {
        type: String
    },
    profile_website: {
        type: String
    },
    profile_avatar: {
        type: Buffer
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps:true
})

profileSchema.virtual("posts", {
    ref: "Post",
    localField: "profile_name",
    foreignField: "author",
  });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile