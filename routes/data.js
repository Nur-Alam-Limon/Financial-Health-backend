// routes/data.js
const express = require('express');
const router = express.Router();
const FinancialData = require('../models/financialData.js');
const { format } = require('date-fns');

// Save financial data
router.post('/', async (req, res) => {
  try {
    const { companyName, income, expenses, debts, assets, score, date } = req.body;
    const formattedDate = format(new Date(date), 'dd/MM/yy');
    const financialData = new FinancialData({ companyName, income, expenses, debts, assets, score, date: formattedDate });
    await financialData.save();
    res.json({ message: 'Financial data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get financial data by company name
router.get('/', async (req, res) => {
  try {
    const { companyName } = req.query;

    if (!companyName) {
      return res.status(400).json({ error: 'Company name is required in the query parameters.' });
    }

    const financialData = await FinancialData.find({ companyName });


    // Extract scores and dates from the financial data
    const scores = [0, ...financialData.map(item => item.score)]; // Prepend a zero to the scores array
    const dates = [0, ...financialData.map(item => item.date)]; // Prepend a zero to the dates array

    // Send the response with the scores and dates
    res.json({ scores, dates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
