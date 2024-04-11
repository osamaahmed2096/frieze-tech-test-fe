import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Form, Container } from "react-bootstrap";
import transformSupportedCurrencies from "./transformers/currency-transformer";

function App() {
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [resultAmount, setResultAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_ENDPOINT}/currency-codes`)
      .then((response) => {
        const transformedCurrencyData = transformSupportedCurrencies(
          response.data
        );

        setAvailableCurrencies(transformedCurrencyData);
      })
      .catch((_) => {
        // Generic message to prevent any security breaches
        setError("Something went wrong fetching currency list");
      });
  }, []);

  const submitData = () => {
    if ((fromCurrency, toCurrency, amount)) {
      axios
        .post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/conversion-rate`, {
          amount,
          from: fromCurrency,
          to: toCurrency,
        })
        .then((response) => {
          setResultAmount(response.data);
          setError("");
        })
        .catch((error) => {
          console.error(error);

          console.log(error);

          // const { error: message } = error.response.data;

          // setError(message);
        });
    } else {
      setError("Please fill out the above form before submitting");
    }
  };

  return (
    <Container>
      <h3>Currency Converter</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>From:</Form.Label>
          <Form.Select onChange={(e) => setFromCurrency(e.target.value)}>
            <option>Select currency to convert to</option>
            {availableCurrencies &&
              availableCurrencies.map(({ value }) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>To:</Form.Label>
          <Form.Select onChange={(e) => setToCurrency(e.target.value)}>
            <option>Select currency to convert to</option>
            {availableCurrencies &&
              availableCurrencies.map(({ value }) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={() => submitData()}>
          Submit
        </Button>
      </Form>

      <p>
        The conversion amount is: <strong>{resultAmount}</strong>
      </p>

      {error && <p className="text-danger">{error}</p>}
    </Container>
  );
}

export default App;
