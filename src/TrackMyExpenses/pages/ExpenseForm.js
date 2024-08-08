import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { expensesActions } from '../reduxstore/expenseSlice';


const ExpenseForm = () => {
    const [enteredMoney, setEnteredMoney] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);
    const totalExpenses = useSelector((state) => state.expenses.totalExpenses);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch("https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/expensedata.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch expenses.");
                }
                const data = await response.json();
                const loadedExpenses = [];
                for (const key in data) {
                    loadedExpenses.push({
                        id: key,
                        money: data[key].money,
                        description: data[key].description,
                        category: data[key].category,
                    });
                }
                dispatch(expensesActions.setExpenses(loadedExpenses));
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    const moneyHandler = (event) => {
        setEnteredMoney(event.target.value);
    };

    const descriptionHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const categoryHandler = (event) => {
        setSelectedCategory(event.target.value);
    };

    const deleteHandler = async (id) => {
        try {
            const response = await fetch(`https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/expensedata/${id}.json`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            dispatch(expensesActions.deleteExpense(id));
            alert("Expense successfully deleted.");
        } catch (error) {
            console.error("Failed to delete expense:", error);
        }
    };

    const editItemHandler = (expense) => {
        setEnteredMoney(expense.money);
        setEnteredDescription(expense.description);
        setSelectedCategory(expense.category);
        setIsEditing(true);
        setEditingId(expense.id);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!enteredMoney.trim() || !enteredDescription.trim() || !selectedCategory.trim()) {
            setError("Please fill out all fields.");
            return;
        }

        const newExpense = {
            money: enteredMoney,
            description: enteredDescription,
            category: selectedCategory,
        };

        try {
            let response;
            if (isEditing) {
                response = await fetch(`https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/expensedata/${editingId}.json`, {
                    method: "PATCH",
                    body: JSON.stringify(newExpense),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                response = await fetch("https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/expensedata.json", {
                    method: "POST",
                    body: JSON.stringify(newExpense),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            if (!response.ok) {
                throw new Error("Failed to send expense data.");
            }

            const data = await response.json();

            if (isEditing) {
                dispatch(expensesActions.updateExpense({ id: editingId, ...newExpense }));
                setIsEditing(false);
                setEditingId(null);
            } else {
                dispatch(expensesActions.addExpense({ id: data.name, ...newExpense }));
            }

            setEnteredMoney("");
            setEnteredDescription("");
            setSelectedCategory("");
        } catch (error) {
            console.error("Error sending expense data:", error);
        }
    };
    // to download file 
    const downloadCSV = () => {
        const csvRows = [
            ["Amount", "Description", "Category"],
            ...expenses.map(expense => [expense.money, expense.description, expense.category])
        ];

        const csvContent = csvRows.map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "expenses.csv";
        link.click();
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-center">{isEditing ? "Edit Expense" : "Add Expense"}</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formMoney">
                                <Form.Control
                                    type="number"
                                    placeholder="Amount"
                                    name="money"
                                    value={enteredMoney}
                                    onChange={moneyHandler}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={enteredDescription}
                                    onChange={descriptionHandler}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategory">
                                <Form.Control as="select" value={selectedCategory} onChange={categoryHandler}>
                                    <option value="">Select Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Movies">Movies</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {isEditing ? "Update Expense" : "Add Expense"}
                            </Button>
                        </Form>
                        <h3 className="mt-4">Expenses</h3>
                        <ul className="list-group">
                            {expenses.map((expense) => (
                                <li key={expense.id} className="list-group-item">
                                    <strong>{expense.money}</strong> - {expense.description} ({expense.category})
                                    <button onClick={() => deleteHandler(expense.id)}>Delete</button>
                                    <button onClick={() => editItemHandler(expense)}>Edit</button>
                                </li>
                            ))}
                        </ul>
                        {totalExpenses > 10000 && (
                             <Alert variant="warning" className="mt-3">
                             Your expenses have exceeded 10,000 rupees! Consider activating premium features.
                             <Button variant="success" className="ml-2">Activate Premium</Button>
                             <Button variant="info" className="ml-2" onClick={downloadCSV}>Download Expenses</Button>
                         </Alert>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ExpenseForm;
