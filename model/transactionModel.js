const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    type:{
        type: String,
        enum: ['deposit', 'withdrawal', 'transfer_send', 'transfer_receive', 'payment'],
        required: true
    },
    amount :{
        type: Number,
        required:true,
    },
    description: {
        type: String,
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: [String],
        enum: ['Pending', 'Completed', 'Failed', 'Cancelled'],
        default: 'Completed',
        required: true
    },
    balanceAfter:{
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);