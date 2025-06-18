import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    class: String,
    grade: String
});

export default mongoose.model('Student', StudentSchema);