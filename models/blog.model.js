import { model, Schema } from 'mongoose';

const BlogSchema = Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Blog title is required'],
    },
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    state: {
        type: String,
        default: 'draft',
    },
    read_count: {
        type: Number,
        default: 0,
    },
    tags: [
        {
            type: String,
        },
    ],
    reading_time: Number,
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    timestamp: {
        type: String,
    },
});

BlogSchema.set('toJSON', {
    transform: (document, r) => {
        r.id = r._id.toString();
        delete r.__v;
        delete r._id;
    },
});

export default model('Blog', BlogSchema);
