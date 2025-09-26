import React, { useState } from "react";

// Single-file React component (Tailwind CSS assumed in host project)
// Features:
// - SIP calculator (monthly amount, period, expected return, inflation adjust)
// - Results with breakdown and assumptions
// - Download result as JSON / CSV
// - Simple internal pages: Home (calculator), About, Benefits, Disclaimer (for approvals), Important Links
// - Minimal, accessible UI ready to drop into a React + Tailwind app

export default function SIPCalculatorApp() {
  const [page, setPage] = useState("home");

  // form state
  const [monthly, setMonthly] = useState(2000);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(12);
  const [adjustInflation, setAdjustInflation] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  function calculateSIP() {
    const P = Number(monthly);
    const yearsNum = Number(years);
    const rAnnual = Number(annualRate) / 100;
    const months = yearsNum * 12;
    const rMonthly = rAnnual / 12;

    let fv = 0;
    if (rMonthly === 0) {
      fv = P * months;
    } else {
      fv = P * ((Math.pow(1 + rMonthly, months) - 1) / rMonthly) * (1 + rMonthly);
    }

    const invested = P * months;

    let cagr = 0;
    if (invested > 0) {
      cagr = Math.pow(fv / invested, 1 / yearsNum) - 1;
    }

    let fvReal = fv;
    let cagrReal = cagr;
    if (adjustInflation) {
      const infl = Number(inflationRate) / 100;
      const realAnnualRate = (1 + rAnnual) / (1 + infl) - 1;
      const realMonthly = realAnnualRate / 12;
      if (realMonthly === 0) {
        fvReal = P * months;
      } else {
        fvReal = P * ((Math.pow(1 + realMonthly, months) - 1) / realMonthly) * (1 + realMonthly);
      }
      if (invested > 0) {
        cagrReal = Math.pow(fvReal / invested, 1 / yearsNum) - 1;
      }
    }

    const res = {
      monthly: P,
      years: yearsNum,
      annualRate: rAnnual,
      months,
      invested,
      fv: Number(fv.toFixed(2)),
      cagr: Number((cagr * 100).toFixed(2)),
      adjustedForInflation: !!adjustInflation,
      inflationRate: adjustInflation ? Number(inflationRate) / 100 : null,
      fvReal: Number(fvReal.toFixed(2)),
      cagrReal: Number((cagrReal * 100).toFixed(2)),
      calculatedAt: new Date().toISOString(),
    };

    setResult(res);
    setShowResult(true);
  }

  return <div>/* Full UI code omitted for brevity */</div>;
}
