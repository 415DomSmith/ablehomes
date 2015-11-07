var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({

    email       : {
                    type: String,
                    required: true,
                    unique: true
                },
    password    : String,
    phone       : Number,
    listings    : [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Listing'
                }],
    agents     : [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Agent'
                }]
});


// generating a hash 
// agentSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// checking if password is valid
// agentSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// create the model for agents and expose it to our app
module.exports = mongoose.model('Client', clientSchema);