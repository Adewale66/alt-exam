import { model, Schema } from 'mongoose';
import crypto from 'crypto';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    hashedPassword: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
        required: [true, 'User email is required'],
    },
});

UserSchema.methods.setPassword = function (password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHashed = crypto
        .scryptSync(password, salt, 64)
        .toString('hex');
    this.hashedPassword = `${salt}:${passwordHashed}`;
};

UserSchema.methods.validPassword = function (password) {
    const [salt, key] = this.hashedPassword.split(':');
    const hashedBuffer = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    const match = crypto.timingSafeEqual(hashedBuffer, keyBuffer);

    return match;
};

UserSchema.set('toJSON', {
    transform: (document, r) => {
        r.id = r._id;
        delete r._id;
        delete r.__v;
        delete r.hashedPassword;
    },
});

export default model('User', UserSchema);
