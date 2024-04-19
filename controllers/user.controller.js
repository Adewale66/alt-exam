import User from '../models/user.model.js';
import { generateToken } from '../middleware/jwt.js';
import {
    EmptyFieldError,
    ResourceNotFoundError,
} from '../errors/user.error.js';

const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) throw new EmptyFieldError('First name required', 400);
    if (!lastName) throw new EmptyFieldError('Last name required', 400);
    if (!email) throw new EmptyFieldError('Email required', 400);
    if (!password) throw new EmptyFieldError('Password required', 400);

    let newUser = await new User({
        firstName,
        lastName,
        email,
    });
    newUser.setPassword(password);
    await newUser.save();
    return res
        .status(201)
        .send({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email) throw new EmptyFieldError('Email required', 400);
    if (!password) throw new EmptyFieldError('Password required', 400);

    const user = await User.findOne({ email });

    if (!user) throw new ResourceNotFoundError('User not found', 400);
    if (!user.validPassword(password))
        return res.status(400).json({ error: 'Invalid Crendentials' });

    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
    };
    const token = generateToken(payload);

    return res.status(200).json({ token: token, user: payload });
};

const logoutUser = async (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        expires: new Date(0),
    })
        .status(200)
        .json({ message: 'Success!' });
};

export { createUser, loginUser, logoutUser };
