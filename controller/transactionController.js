const User = require("../model/userModel.js")
const Transaction = require('../model/transactionModel.js')

//CREATE - Add money (deposit)
// (WORKING ✅)
exports.deposit = async (req, res) =>{
    try {
        const {userId, amount, description} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }

        user.balance += amount; 
        await user.save();

        const transaction = new Transaction({
            userId,
            type: 'deposit',
            amount,
            description,
            balanceAfter: user.balance
        })

        await transaction.save();
        res.status(201).json({
            message: 'Deposit successful',
            transaction,
            newBalance: user.balance
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

//CREATE - Withdraw money 
// (WORKING ✅)
exports.withdraw = async (req, res) =>{
    try {
        const {userId, amount, description} = req.body

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                error: "User not found."
            })
        
        }
        if(user.balance < amount){
            res.status(400).json({
                error: "Insufficient Balance."
            })
        }
        user.balance -= amount;
        user.amount += amount;
        await user.save();

        const transaction = new Transaction({
            userId,
            type: "withdrawal",
            amount,
            description,
            balanceAfter: user.balance
        })

        await transaction.save();

        res.status(201).json({
            message: 'Withdrawal Succesful',
            transaction,
            newBalance: user.balance
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// CREATE - Transfer money
// (WORKING ✅)
exports.transfer = async (req, res) =>{
    try {
        const {senderId, recipientId, amount, description} = req.body

        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId)


        if(!sender || !recipient){
            return res.status(404).json({
                error: "User not found."
            })
        }

        if(sender.balance < amount){
            res.status(400).json({
                error: "Insufficient Balance."
            })
        }

        sender.balance -= amount;
        recipient.balance += amount;

        await Promise.all([sender.save(), recipient.save()]);

        const senderTransaction = new Transaction({
            userId: senderId,
            type: "transfer_send",
            amount,
            description,
            recipient,
            balanceAfter: sender.balance
        })

        const recipientTransaction = new Transaction({
            userId: recipientId,
            type: "transfer_receive",
            amount,
            description,
            recipientId: senderId,
            balanceAfter: recipient.balance
        })

        await Promise.all([senderTransaction.save(), recipientTransaction.save()]);


        res.status(201).json({
            message: 'Transfer Succesful',
            senderBalance: sender.balance,
            recipientBalance: recipient.balance
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

//READ - Get Transaction History 
// (WORKING ✅)
exports.getTransactions = async (req, res) =>{
    try {
        const { userId }= req.body;
        const { page = 1, limit = 10, type} = req.query;

        const filter = { userId };
        if(type) filter.type = type;

        const transactions = await Transaction.find(filter)
            .populate('recipientId', 'username')
            .sort({ createdAt: -1})
            .limit(limit * 1)
            .skip((page - 1) * limit)

        const total = await Transaction.countDocuments(filter)

        res.json({
            transactions,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// UPDATE - Update Transaction status (admin only)
// (WORKING ✅)
exports.updateTransactionStatus = async (req, res) =>{
    try {
        const { status } = req.body;

        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators : true }
        )
        if(!transaction) {
            return res.status(404).json({
                error: "Transaction not found"
            })
        }
        res.json({message: 'Transaction status updated', transaction})
    }catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

//DELETE - Delete Transaction (admin)
// (WORKING ✅)
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id)
        if(!transaction) {
            return res.status(404).json({
                error: "Transaction not found."
            })
        }

        res.json({
            message: "Transaction Deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}