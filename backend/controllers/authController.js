import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const signup = async(req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ msg: 'User created'});
    }
    catch(err){
        res.status(400).json({ msg: 'Signup Failed', error: err.message});
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if(!user || !(await user.comparePassword(password)))
        return res.status(400).json({ msg: 'Invalid Credentials'});

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: '1d',
    });

    res.json({ token });
}