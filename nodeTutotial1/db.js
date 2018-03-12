var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nodeTutorial1', { useMongoClient: true });

var userSchema = new mongoose.Schema(
    {
        username: String,
        email: String
    },
    {
        collection:'usercollection'
    }
);

module.exports = {Mongoose: mongoose, UserSchema: userSchema};
