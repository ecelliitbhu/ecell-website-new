import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');

const schemesSchema = new mongoose.Schema({
    schemeName: {
        type: String,
        required: true,
    },
    schemeType: {//government or private
        type: String,
        required: true,
    },
    funding: {
        type: Number,
    },
    description: {
        type: String,
        required: true,
    }
}, { collections: 'allSchemes' });

export default mongoose.models.Schemes ||mongoose.model('Schemes', schemesSchema);