"use client";

import { useState } from "react";

type Op = "+" | "-" | "×" | "÷" | null;

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

export default function CalculatorWindow() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<Op>(null);
  const [waitingForNew, setWaitingForNew] = useState(false);

  function inputDigit(d: string) {
    if (waitingForNew) {
      setDisplay(d);
      setWaitingForNew(false);
    } else {
      setDisplay(display === "0" ? d : display + d);
    }
  }

  function inputDecimal() {
    if (waitingForNew) {
      setDisplay("0.");
      setWaitingForNew(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  }

  function clearAll() {
    setDisplay("0");
    setStored(null);
    setOperator(null);
    setWaitingForNew(false);
  }

  function handleOperator(nextOp: Op) {
    const inputValue = parseFloat(display);
    if (stored === null) {
      setStored(inputValue);
    } else if (operator) {
      const result = compute(stored, inputValue, operator);
      setStored(result);
      setDisplay(String(result));
    }
    setWaitingForNew(true);
    setOperator(nextOp);
  }

  function handleEquals() {
    const inputValue = parseFloat(display);
    if (operator && stored !== null) {
      const result = compute(stored, inputValue, operator);
      setDisplay(String(result));
      setStored(null);
      setOperator(null);
      setWaitingForNew(true);
    }
  }

  function toggleSign() {
    setDisplay(String(parseFloat(display) * -1));
  }

  function percent() {
    setDisplay(String(parseFloat(display) / 100));
  }

  const buttons: { label: string; onClick: () => void; className?: string }[] = [
    { label: "C", onClick: clearAll },
    { label: "±", onClick: toggleSign },
    { label: "%", onClick: percent },
    { label: "÷", onClick: () => handleOperator("÷") },
    { label: "7", onClick: () => inputDigit("7") },
    { label: "8", onClick: () => inputDigit("8") },
    { label: "9", onClick: () => inputDigit("9") },
    { label: "×", onClick: () => handleOperator("×") },
    { label: "4", onClick: () => inputDigit("4") },
    { label: "5", onClick: () => inputDigit("5") },
    { label: "6", onClick: () => inputDigit("6") },
    { label: "-", onClick: () => handleOperator("-") },
    { label: "1", onClick: () => inputDigit("1") },
    { label: "2", onClick: () => inputDigit("2") },
    { label: "3", onClick: () => inputDigit("3") },
    { label: "+", onClick: () => handleOperator("+") },
    { label: "0", onClick: () => inputDigit("0"), className: "col-span-2" },
    { label: ".", onClick: inputDecimal },
    { label: "=", onClick: handleEquals },
  ];

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8] p-3">
      <div className="bg-[#c7e8b0] border-2 border-gray-400 rounded px-3 py-3 mb-3 text-right shrink-0">
        <p
          className="text-2xl font-mono text-gray-900 truncate"
          aria-live="polite"
          aria-label={`Display: ${display}`}
        >
          {display}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        {buttons.map((b) => (
          <button
            key={b.label}
            onClick={b.onClick}
            aria-label={b.label}
            className={`xp-btn text-sm font-semibold ${b.className ?? ""}`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
