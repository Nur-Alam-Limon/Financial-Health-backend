// models/FinancialData.js
const mongoose = require('mongoose');

const FinancialDataSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
  debts: {
    type: Number,
    required: true,
  },
  assets: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date:{
    type: String,
    required: true,
  }
});

const FinancialData = mongoose.model('FinancialData', FinancialDataSchema);

module.exports = FinancialData;
