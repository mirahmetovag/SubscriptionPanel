const { createBankAccount, deleteBankAccount, getBankAccountHistory, putMoneyOnBankAccount, withdrawMoneyFromBankAccount } = require('../controllers/bank.controller');

const router = require('express').Router();

router.post('/bank/account', createBankAccount);
router.put('/bank/account/put', putMoneyOnBankAccount);
router.put('/bank/account/withdraw', withdrawMoneyFromBankAccount);
router.delete('/bank/account', deleteBankAccount);
router.get('/bank/account/history', getBankAccountHistory);

module.exports = router;