var mongoose = require('mongoose');

var userDataSchema = new mongoose.Schema({
    'drug-name': {
        type: String
    },
    'side-effects': {
        type: String
    },
    'dosage': {
        type: String
    },
    'when-ntb-taken': {
        type: String
    }
})

var UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;