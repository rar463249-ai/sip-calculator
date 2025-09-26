function calculateSIP() {
  const monthly = parseFloat(document.getElementById('monthly').value);
  const years = parseInt(document.getElementById('years').value);
  const annualRate = parseFloat(document.getElementById('annualRate').value) / 100;
  const inflation = document.getElementById('inflation').checked;
  const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;

  const months = years * 12;
  const rMonthly = annualRate / 12;

  let fv;
  if (rMonthly === 0) {
    fv = monthly * months;
  } else {
    fv = monthly * ((Math.pow(1 + rMonthly, months) - 1) / rMonthly) * (1 + rMonthly);
  }

  const invested = monthly * months;
  let cagr = Math.pow(fv / invested, 1 / years) - 1;

  let fvReal = fv;
  let cagrReal = cagr;
  if (inflation) {
    const realAnnualRate = (1 + annualRate) / (1 + inflationRate) - 1;
    const realMonthly = realAnnualRate / 12;
    if (realMonthly === 0) {
      fvReal = monthly * months;
    } else {
      fvReal = monthly * ((Math.pow(1 + realMonthly, months) - 1) / realMonthly) * (1 + realMonthly);
    }
    cagrReal = Math.pow(fvReal / invested, 1 / years) - 1;
  }

  document.getElementById('result').innerHTML = `
    <div><strong>Total Invested:</strong> ₹${invested.toLocaleString()}</div>
    <div><strong>Maturity Value:</strong> ₹${fv.toFixed(2)}</div>
    <div><strong>CAGR:</strong> ${(cagr * 100).toFixed(2)}%</div>
    ${inflation ? `<div><strong>Inflation Adjusted Value:</strong> ₹${fvReal.toFixed(2)}</div>
    <div><strong>Real CAGR:</strong> ${(cagrReal * 100).toFixed(2)}%</div>` : ""}
    <p style="margin-top:10px;font-size:12px;color:#555;">Disclaimer: This is an educational tool for illustration only, not financial advice.</p>
  `;
}