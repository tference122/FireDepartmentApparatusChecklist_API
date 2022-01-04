const mongoose = require('mongoose');

const CheckListModel = mongoose.Schema({
    apparatus_type: String,
    apparatus_number: Number,
    date_of_check: Date,
    members_that_checked: [Number],
    company: Number,
    compartments_of_apparatus: [ { name: String, items_in_compartment: [ { item_name: String, item_status: Boolean, item_comment: String } ]} ]
});

const CheckList = mongoose.model('CheckList', CheckListModel);
module.exports = CheckList;