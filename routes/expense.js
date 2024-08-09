const express = require("express");
const expenseController = require("../controllers/expense");
const router = express.Router();

router.get("/get-expenses", expenseController.getExpenses);
router.post("/post-expense", expenseController.postExpense);
router.put("/edit-expense/:itemId", expenseController.editExpense);
router.delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = router;
