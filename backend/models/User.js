import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    pwd: { type: String, required: true },
    refreshToken: [String]
})

export default mongoose.model("User", userSchema);