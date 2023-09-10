export async function testapi({ searchquery: queryKey, limit }) {
  let url = `https://dummyjson.com/products/search?q=${queryKey}`;

  if (limit) {
    url = url + `&limit=${limit}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function getBorrowers() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/borrowers`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function getBorrowerById(id) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/borrowers/${id}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function getLoans() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/loans`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function getLoanById(id) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/loans/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function updateBorrowerById(id, borrower) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/borrowers/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrower),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function createBorrower(borrower) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/borrowers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrower),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function createPaymentHistory(paymentHistory) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/paymenthistories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentHistory),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function createLoan(Loan) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/loans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Loan),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}
