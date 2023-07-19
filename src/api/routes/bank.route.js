const { createBankAccount, deleteBankAccount, getBankAccountHistory, putMoneyOnBankAccount, payForChannelFromBankAccount } = require('../controllers/bank.controller');

const router = require('express').Router();

router.post('/bank/account', createBankAccount);
router.put('/bank/account/put', putMoneyOnBankAccount);
router.put('/bank/account/:channel_id', payForChannelFromBankAccount);
router.delete('/bank/account', deleteBankAccount);
router.get('/bank/account/history', getBankAccountHistory);

module.exports = router;