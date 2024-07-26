document.getElementById('taxForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const income = parseFloat(document.getElementById('income').value);
  const age = parseFloat(document.getElementById('age').value);
  const dependents = parseFloat(document.getElementById('dependents').value);
  
  const tax = calculateTax(income, age, dependents);
  
  document.getElementById('result').innerText = `Calculated Tax: ${tax}`;
});

function calculateTax(income, age, dependents) {
  // Validasi input
  if (typeof income !== 'number' || income < 0 || isNaN(income)) {
      return "Invalid income";
  }
  if (typeof age !== 'number' || age < 0 || isNaN(age)) {
      return "Invalid age";
  }
  if (typeof dependents !== 'number' || dependents < 0 || isNaN(dependents)) {
      return "Invalid dependents";
  }

  // Pengecualian pajak berdasarkan usia
  if (age < 18) {
      return "Not eligible for tax";
  }

  // Menghitung pajak berdasarkan pendapatan
  let taxRate;
  if (income <= 10000) {
      taxRate = 0.10;
  } else if (income <= 50000) {
      taxRate = 0.20;
  } else {
      taxRate = 0.30;
  }

  let tax = income * taxRate;

  // Diskon pajak untuk usia 65 atau lebih
  if (age >= 65) {
      tax *= 0.80; // Mengurangi 20%
  }

  // Pengurangan pajak untuk setiap tanggungan
  tax -= dependents * 500;

  // Pajak minimum adalah $0
  if (tax < 0) {
      tax = 0;
  }

  return tax;
}
