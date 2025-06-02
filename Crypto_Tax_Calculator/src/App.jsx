import { useActionState, useState, useEffect } from "react";
import "./App.css";

function App() {
  const taxRates = {
    "$0 - $18200": "0%",
    "$18201 - $45000": "Nil + 19% of excess over $18,200",
    "$45001 - $120000": "$5902 + 32.5% of excess over $45,000",
    "$120001 - $180000": "$29,467 + 37% of excess over $120,000",
    "$180001 + ": "$51,667 + 45% of excess over $180,000",
  };

  const [isShortTerm, setIsShortTerm] = useState(true);
  const [tax, setTax] = useState("Nil");
  const [gain, setGain] = useState(0);

  const [discount, setDiscount] = useState(0);
const [netCapitalGain, setNetCapitalGain] = useState(0);
const [taxToPay, setTaxToPay] = useState(0);


  const [values, setValues] = useState({
    purchasePrice: 0,
    salePrice: 0,
    expenses: 0,
    income: "",
  });





  useEffect(() => {
  const purchase = parseFloat(values.purchasePrice) || 0;
  const sale = parseFloat(values.salePrice) || 0;
  const expenses = parseFloat(values.expenses) || 0;

  const capitalGain = sale - purchase - expenses;
  setGain(capitalGain);

  // Step 2: Long term discount
  const isLongTerm = !isShortTerm;
  const discountVal = isLongTerm && capitalGain > 0 ? capitalGain * 0.5 : 0;
  setDiscount(discountVal);

  // Step 3: Net Capital Gain
  const netGain = capitalGain - discountVal;
  setNetCapitalGain(netGain);

  // Step 4: Calculate tax to pay
  const income = values.income;
  let taxRate = 0;

  if (netGain > 0) {
    if (income === "$18201 - $45000") taxRate = 0.19;
    else if (income === "$45001 - $120000") taxRate = 0.325;
    else if (income === "$120001 - $180000") taxRate = 0.37;
    else if (income === "$180001 + ") taxRate = 0.45;
    // $0 - $18200 has no tax
  }

  setTaxToPay(netGain * taxRate);
}, [values, isShortTerm]);








  const handleTaxRates = (e) => {

    for(const key in taxRates)
    {
      if(e.target.value === key)
      {
        setTax(taxRates[key]); 
      }

      if(e.target.value === "")
      {
        setTax("Nil")
      }
    }
    
  };

  const handleUserInputs = (e) => {
    let key = e.target.id;
  let value = e.target.value;

  setValues((prev) => {
    const updated = { ...prev, [key]: value };

    return updated;
  });
  };

  const handleInvestmentType = (e) => {
    let type = e.target.id;
    if (type === "long") {
      setIsShortTerm(false);
    } else {
      setIsShortTerm(true);
    }
  };

  return (
    <>
      <h1 className="heading">Crypto Tax Calculator for Australia</h1>
      <div className="container">
        {/* Left box starts from here */}

        <div className="left_box">
          <span>
            <label htmlFor="year">Financial Year</label>
            <select name="country" id="year">
              <option value="FY 2023-24">FY 2023-24</option>
            </select>
          </span>

          <span className="flex_col">
            <label htmlFor="purchasePrice">
              Enter purchase price of Crypto
            </label>
            <input
              value={values.purchasePrice}
              onChange={handleUserInputs}
              id="purchasePrice"
              type="number"
            />
          </span>

          <span className="flex_col">
            <label htmlFor="expenses">Enter your expenses</label>
            <input
              value={values.expenses}
              onChange={handleUserInputs}
              id="expenses"
              type="number"
            />
          </span>

          <span className="flex_col">
            <label htmlFor="income">Select your annual income</label>
            <select
              value={values.income}
              onChange={(e) => {
                handleUserInputs(e), handleTaxRates(e);
              }}
              name="country"
              id="income"
            >
              <option value="">Select</option>
              <option value="$0 - $18200">$0 - $18200</option>
              <option value="$18201 - $45000">$18201 - $45000</option>
              <option value="$45001 - $120000">$45001 - $120000</option>
              <option value="$120001 - $180000">$120001 - $180000</option>
              <option value="$180001 + ">$180001 + </option>
            </select>
          </span>

         {!isShortTerm && <span className="flex_col">
            <p>Capital gains amount</p>
            <p className="background">{gain}</p>
          </span>}

          <span className="flex_col">
            <p>Net capital gains tax amount</p>
            <p style={{color: 'green'}} className="background">$ {netCapitalGain}</p>
          </span>
        </div>

        {/* Right box starts from here */}

        <div className="right_box">
          <span>
            <label htmlFor="country">Country</label>
            <select name="country" id="country">
              <option value="FY 2023-24">Australia</option>
            </select>
          </span>

          <span className="flex_col">
            <label htmlFor="salePrice">Enter sale price of Crypto</label>
            <input
              value={values.salePrice}
              onChange={handleUserInputs}
              id="salePrice"
              type="number"
            />
          </span>

          <span className="flex_col">
            <p>Investment Type</p>
            <span
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label htmlFor="short">
                Short Term{" "}
                <input
                  onChange={(e) => {
                    handleInvestmentType(e);
                  }}
                  name="choice"
                  id="short"
                  type="radio"
                  checked={isShortTerm}
                />
              </label>

              <label htmlFor="long">
                Long Term{" "}
                <input
                  onChange={(e) => {
                    handleInvestmentType(e);
                  }}
                  name="choice"
                  id="long"
                  type="radio"
                  checked={!isShortTerm}
                />
              </label>
            </span>
          </span>

          <span className="flex_col">
            <p>Tax Rate</p>
            <p className="background">{tax}</p>
          </span>

          {!isShortTerm && (
            <span className="flex_col">
              <p>Discount for long term gains</p>
              <p className="background">{discount}</p>
            </span>
          )}

          <span className="flex_col">
            <p>The tax you need to pay</p>
            <p className="background" style={{color: 'blue'}}>$ {taxToPay}</p>
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
