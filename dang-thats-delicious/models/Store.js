const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: 'Please enter a store name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

// needs to be a proper function because we need to reference 'this'
storeSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next(); //skip it
        return; // stop this function from running
    }
    this.slug = slug(this.name);
    next();
    // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);