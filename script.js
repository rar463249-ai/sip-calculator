document.getElementById('year').textContent = new Date().getFullYear();

function calculateSIP(monthly, annualRate, years){
  const r = annualRate/100/12;
  const n = years*12;
  if(r === 0) return monthly * n;
  const fv = monthly * (Math.pow(1+r, n) - 1) / r;
  return fv;
}

const form = document.getElementById('sipForm');
const resultBox = document.getElementById('result');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const monthly = parseFloat(document.getElementById('monthly').value) || 0;
  const rate = parseFloat(document.getElementById('rate').value) || 0;
  const years = parseInt(document.getElementById('years').value) || 0;
  if(monthly <= 0 || years <= 0 || rate < 0){
    alert('Kripya sahi values daalein: Monthly > 0, Years > 0, Rate >= 0');
    return;
  }
  const fv = calculateSIP(monthly, rate, years);
  const invested = monthly * years * 12;
  const gain = fv - invested;
  document.getElementById('invested').textContent = '₹ ' + invested.toLocaleString(undefined, {maximumFractionDigits:2});
  document.getElementById('future').textContent = '₹ ' + fv.toLocaleString(undefined, {maximumFractionDigits:2});
  document.getElementById('gain').textContent = '₹ ' + gain.toLocaleString(undefined, {maximumFractionDigits:2});
  resultBox.classList.remove('hide');
});

document.getElementById('resetBtn').addEventListener('click', function(){
  document.getElementById('monthly').value = 5000;
  document.getElementById('rate').value = 12;
  document.getElementById('years').value = 10;
  document.getElementById('result').classList.add('hide');
});