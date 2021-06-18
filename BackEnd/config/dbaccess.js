const mongoose = require('mongoose');

function dbaccess(){
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to the database'))
        .catch((err) => console.log(err));
}
    
module.exports = dbaccess; 