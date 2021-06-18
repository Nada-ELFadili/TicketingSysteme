const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        minlength: 4
    },
    lname:{
        type: String,
        required: true,
        minlength: 4
    },
    username:{
        type: String,
        required: true,
        minlength: 4,
        unique: true
    },
    password:{
        type: String,
        minlength: 4,
        required:true
    },
    type:{
        type: String,
        required: true,
        enum: ['user', 'admin', 'tech'],
        default: 'user'
    },
    email:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        default: 'disabled'
    }
},{timestamps: true});

//Hook fire after doc save
/*
userSchema.post('save', function(doc, next) {
    console.log('user saved ' , doc);
    next();
});
*/

//Hook fire before doc save
userSchema.pre('save', async function(next){
    if(this.password){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    }
    next();
});


const User = mongoose.model('user',userSchema);

module.exports = User