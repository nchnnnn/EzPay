const express = require('express');
const route = express.Router();
const transactionController = require('../controller/transactionController.js')

route.post('/deposit', transactionController.deposit) // Current user want to deposit some balance
route.post('/withdraw', transactionController.withdraw) // Current User want to withdraw some balance
route.post('/transfer', transactionController.transfer) // Current user wants to transfer balance to another useer
route.post('/', transactionController.getTransactions) // Get all transaction of the current user
route.put('/update/:id', transactionController.updateTransactionStatus); // Admin can update the status of the transaction (pending, cancelled, failed, completed)
route.delete('/delete/:id', transactionController.deleteTransaction); // Admin can delete specific transaction


module.exports = route;