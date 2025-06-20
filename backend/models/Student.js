import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
});

export default mongoose.model('Student', StudentSchema);