import React, { useState } from "react";
import { Container, Row, Col, Form, Button ,Alert} from "react-bootstrap";

const ExpenseForm = () => {
    const [enteredMoney, setEnteredMoney] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const moneyHandler = (event) => {
        setEnteredMoney(event.target.value);
    };

    const descriptionHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const categoryHandler = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!enteredMoney.trim() || !enteredDescription.trim() || ! selectedCategory.trim()) {
        
            setError("Please fill out all fields.");
            return;
          }

        const newExpense = {
            money: enteredMoney,
            description: enteredDescription,
            category: selectedCategory,
        };

        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

        setEnteredMoney("");
        setEnteredDescription("");
        setSelectedCategory("");
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-center">Add Expense</h2>
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
                                   
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Expense
                            </Button>
                        </Form>
                        <h3 className="mt-4">Expenses</h3>
                        <ul className="list-group">
                            {expenses.map((expense, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>{expense.money}</strong> - {expense.description} ({expense.category})
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ExpenseForm;
