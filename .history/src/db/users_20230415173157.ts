import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    usernames: { type: String, required: true },
    email: { type: String, required: true},
    authentication: { 
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true },
        sesstionToken: { type: String, required: true },
    }
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()
export const getUserByEmail = () => (email: string) => UserModel.findOne({email})