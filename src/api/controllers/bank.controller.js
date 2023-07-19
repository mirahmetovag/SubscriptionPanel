const {fetch, fetchOne} = require ('../../libs/pg');

const createBankAccount =  async (req,res) => {
    const {cardNumber, user_id} = req.body;
    const card = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    if (card) return res.status(409).json({message: 'The card number is already used'});
    await fetchOne('INSERT INTO bankAccounts (cardNumber, user_id) values ($1,$2)', cardNumber, user_id);
    res.status(201).json({message: 'New card successfully created'});
};

const putMoneyOnBankAccount =  async (req,res) => {
    const {cardNumber, amount} = req.body;
    const transactionType = 'put';
    const theCard = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    if (!theCard) return res.status(404).json({message: 'The card is not found'});
    const account = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    console.log(account.account_id);
    await fetchOne('UPDATE bankAccounts SET balance = $1 WHERE account_id = $2', account.balance + amount, account.account_id);
    await fetchOne('INSERT INTO transactions (account_id, transactionType, amount) values($1, $2, $3)', account.account_id, transactionType, amount);
    res.status(200).json({message: 'Successfully was put'});
};

const payForChannelFromBankAccount =  async (req,res) => {
    const {cardNumber, amount} = req.body;
    const channel_id = req.params;
    const transactionType = 'withdraw';
    const theCard = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    if (!theCard) return res.status(404).json({message: 'The card is not found'});
    const account = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    await fetchOne('BEGIN TRANSACTION');
    if (account.balance < amount) {
        await fetchOne('ROLLBACK');
        return res.status(409).json({message:`There is no enough money for transaction. You need other ${amount - account.balance}`})
    }
    await fetchOne('UPDATE bankAccounts SET balance = balance - $1 WHERE account_id = $2', amount, account.account_id);
    await fetchOne('UPDATE members SET balance = balance + $1 WHERE user_id = $2', amount, account.user_id);
    await fetchOne('INSERT INTO transactions (account_id, transactionType, amount) values($1, $2, $3)', account.account_id, transactionType, amount);
    await fetchOne('COMMIT');
    res.status(200).json({message: 'Successfully was withdrawen'});
};

const deleteBankAccount =  async (req,res) => {
    const {cardNumber} = req.body;
    const theCard = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    if (!theCard) return res.status(404).json({message: 'The card is not found'});
    const account = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    await fetchOne('DELETE FROM bankAccounts WHERE account_id = $1', account.account_id);
    res.status(200).json({message:'Successfully deleted'});
};

const getBankAccountHistory =  async (req,res) => {
    const {cardNumber} = req.body;
    const theCard = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    if (!theCard) return res.status(404).json({message: 'The card is not found'});
    const account = await fetchOne('SELECT * FROM bankAccounts WHERE cardNumber = $1', cardNumber);
    const data = await fetch('SELECT * FROM transactions WHERE account_id = $1', account.account_id);
    res.status(200).json({mesage: 'History was successfully fromed', data});
};

module.exports = {
    createBankAccount,
    putMoneyOnBankAccount,
    payForChannelFromBankAccount,
    deleteBankAccount,
    getBankAccountHistory
}