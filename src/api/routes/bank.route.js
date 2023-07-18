const { createBankAccount, updateBankAccount, deleteBankAccount, getBankAccount } = require('../controllers/bank.controller');

const router = require('express').Router();

router.post('/bank/account', createBankAccount);
router.put('/bank/account', updateBankAccount);
router.delete('/bank/account', deleteBankAccount);
router.get('/bank/account', getBankAccount);

module.exports = router;