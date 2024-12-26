import React, { useState } from "react";
import Display from "../Display/Display";
import Button from "../Button/Button";

const Calculater: React.FC = () => {
    const [input, setInput] = useState<string>("0");
    const [prevInput, setPrevInput] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);

    const handleNumberClick = (value: string) => {
        setInput((prev) => (prev === '0' ? value : prev + value));
    }

    const handleOperatorClick = (op: string) => {
        if (operator && prevInput) {
            const result = calculate(prevInput, input, operator);
            setPrevInput(result);
            setInput('0');
            setOperator(op);
        } else {
            setPrevInput(input);
            setInput('0');
            setOperator(op);
        }
    };

    const calculate = (a: string, b: string, op: string): string => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        switch (op) {
            case '+':
                return (numA + numB).toString();
            case '-':
                return (numA - numB).toString();
            case '*':
                return (numA * numB).toString();
            case '/':
                return numB !== 0 ? (numA / numB).toString() : 'Error';
            default:
                return '0';
        }
    };

    const handleEqualsClick = () => {
        if (operator && prevInput) {
            const result = calculate(prevInput, input, operator);
            setInput(result);
            setPrevInput(null);
            setOperator(null);
        }
    };

    const handleClearClick = () => {
        setInput('0');
        setPrevInput(null);
        setOperator(null);
    };


    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
    ];

    return (
        <div className="calculater">
            <Display value={input} />
            <div className="buttons">
                {buttons.map((btn) => (
                    <Button
                        key={btn}
                        label={btn}
                        onClick={
                            btn === '='
                                ? handleEqualsClick
                                : btn === 'C'
                                    ? handleClearClick
                                    : btn === '+' || btn === '-' || btn === '*' || btn === '/'
                                        ? handleOperatorClick
                                        : handleNumberClick
                        } />
                ))}
                <Button label="C" onClick={handleClearClick} />
            </div>
        </div>
    );
};

export default Calculater;