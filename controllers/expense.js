const Expense = require("../models/expense-model");

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((exp) => {
      res.json(exp);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while fetching exp" });
    });
};

exports.postExpense = (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  Expense.create({
    amount: amount,
    description: description,
    category: category,
  })
    .then((exp) => {
      res.status(201).json({ message: "exp created successfully", exp: exp });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while adding the exp" });
    });
};

exports.deleteExpense = (req, res, next) => {
  const prodId = req.params.id;
  Expense.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.status(200).json({ message: "exp deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the exp" });
    });
};

exports.editExpense = (req, res, next) => {
  const expenseId = req.params.itemId;
  const updatedAmount = req.body.amount;
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.category;

  Expense.findByPk(expenseId)
    .then((expense) => {
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      expense.amount = updatedAmount;
      expense.description = updatedDescription;
      expense.category = updatedCategory;
      return expense.save();
    })
    .then((updatedExpense) => {
      res.json({
        message: "Expense updated successfully",
        exp: updatedExpense,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the expense" });
    });
};
