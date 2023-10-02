const express = require('express');
const app = express();
app.use(express.json()); // To parse JSON body in POST requests

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
const transactions = [];

app.post('/add', (req, res) => {
    const { payer, points, timestamp } = req.body;

    transactions.push({ payer, points, timestamp });

    res.status(200).end();
});
app.post('/spend', (req, res) => {
    const { points } = req.body;
    let remainingPoints = points;

    // Sort transactions by timestamp
    transactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const spentPoints = [];
    
    for (let transaction of transactions) {
        if (remainingPoints <= 0) break;
        
        const spendablePoints = Math.min(transaction.points, remainingPoints);
        
        remainingPoints -= spendablePoints;
        transaction.points -= spendablePoints;

        const spentIndex = spentPoints.findIndex(t => t.payer === transaction.payer);
        
        if (spentIndex > -1) {
            spentPoints[spentIndex].points -= spendablePoints;
        } else {
            spentPoints.push({ payer: transaction.payer, points: -spendablePoints });
        }
    }
    
    if (remainingPoints > 0) {
        return res.status(400).send('Not enough points');
    }

    res.status(200).json(spentPoints);
});
app.get('/balance', (req, res) => {
    const balance = {};

    for (let transaction of transactions) {
        if (transaction.payer in balance) {
            balance[transaction.payer] += transaction.points;
        } else {
            balance[transaction.payer] = transaction.points;
        }
    }

    res.status(200).json(balance);
});
const express = require('express');
const app = express();
app.use(express.json());

const transactions = [];

app.post('/add', (req, res) => {
    // Add Points code here
});

app.post('/spend', (req, res) => {
    // Spend Points code here
});

app.get('/balance', (req, res) => {
    // Get Points Balance code here
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
