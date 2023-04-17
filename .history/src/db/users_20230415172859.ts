import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    usernames: { type: String, required: true },
    email: { type: String, required: true},
    authentication: { 
        password: { type: String, required: true, select: false }
    }
})