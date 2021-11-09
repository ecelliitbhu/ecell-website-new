import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    blogName: {
        type: String,
        required: true,
    },
    blogSubheading : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
}, { collections: 'allBlogs' });

export default mongoose.models.Blog ||mongoose.model('Blog', blogsSchema);