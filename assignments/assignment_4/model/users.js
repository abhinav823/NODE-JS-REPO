const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema ({
    name: {
        type: String,
        required : true
    },
    email:{
        required : true,
        type: String,
        unique : true
    },
    isPromoted: Boolean 
});

const users = mongoose.model("Users", userSchema);

module.exports = users;