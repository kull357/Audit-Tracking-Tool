







// const baseUrl = "http://localhost:5000";

// // Handle Ticket Submission
// document.getElementById("ticketForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const data = Object.fromEntries(formData);

//   const res = await fetch(`${baseUrl}/submit_ticket`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });

//   const result = await res.json();
//   alert(result.message);
//   e.target.reset();
// });

// // Handle Audit Data Submission (by Row Number)
// document.getElementById("auditForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const data = {
//     row_number: formData.get("row_number"),
//     auditor_name: formData.get("auditor_name"),
//     audit_comments: formData.get("audit_comments"),
//     audit_status: formData.get("audit_status")
//   };

//   const res = await fetch(`${baseUrl}/add_audit`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });

//   const result = await res.json();
//   if (res.ok) {
//     alert(result.message);
//   } else {
//     alert("❌ Error: " + result.message);
//   }
//   e.target.reset();
// });

// // ✅ Search by Ticket ID (filtered only incomplete records)
// async function searchByTicketId() {
//   const ticketId = document.getElementById("searchTicketId").value;
//   const res = await fetch(`${baseUrl}/search_ticket?ticket_id=${ticketId}`);
//   const result = await res.json();

//   const showAllLink = document.getElementById("showAllLink");
//   showAllLink.setAttribute("data-ticket-id", ticketId);

//   if (Array.isArray(result) && result.length > 0) {
//     showResults(result);
//     showAllLink.style.display = "inline";
//   } else {
//     showResult(result);
//     showAllLink.style.display = "none";
//   }
// }

// // ✅ Show all rows for a ticket_id
// async function showAllRowsForTicketId() {
//   const ticketId = document.getElementById("showAllLink").getAttribute("data-ticket-id");
//   const res = await fetch(`${baseUrl}/search_ticket_all?ticket_id=${ticketId}`);
//   const result = await res.json();
//   if (Array.isArray(result)) {
//     showResults(result);
//   } else {
//     showResult(result);
//   }
// }

// // Search by Row Number
// async function searchByRowNumber() {
//   const rowNumber = document.getElementById("searchRowNumber").value;
//   const res = await fetch(`${baseUrl}/search_row?row_number=${rowNumber}`);
//   const result = await res.json();
//   showResult(result);
// }

// // Display result table (single object)
// function showResult(data) {
//   const container = document.getElementById("resultTable");
//   if (data.message) {
//     container.innerHTML = `<p>${data.message}</p>`;
//     return;
//   }

//   const columnOrder = [
//     "Row Number",
//     "ticket_id",
//     "ticket_name",
//     "developer_name",
//     "no_of_urls",
//     "urls_list",
//     "audit_type",
//     "auditor_name",
//     "audit_assigned_date",
//     "audit_assigned_time",
//     "audit_status",
//     "audit_comments",
//     "audit_completion_date",
//     "audit_completion_time",
//     "BLI",
//     "request_assigned_date",
//     "request_due_date"
//   ];

//   let html = "<table border='1'><tr>";
//   for (const col of columnOrder) {
//     html += `<th>${col}</th>`;
//   }
//   html += "</tr><tr>";
//   for (const col of columnOrder) {
//     html += `<td>${data[col] ?? "Null"}</td>`;
//   }
//   html += "</tr></table>";

//   container.innerHTML = html;
// }

// // Display result table (multiple rows)
// function showResults(dataList) {
//   const container = document.getElementById("resultTable");
//   if (!Array.isArray(dataList) || dataList.length === 0) {
//     container.innerHTML = "<p>No records found.</p>";
//     return;
//   }

//   const columnOrder = [
//     "Row Number",
//     "ticket_id",
//     "ticket_name",
//     "developer_name",
//     "no_of_urls",
//     "urls_list",
//     "audit_type",
//     "auditor_name",
//     "audit_assigned_date",
//     "audit_assigned_time",
//     "audit_status",
//     "audit_comments",
//     "audit_completion_date",
//     "audit_completion_time",
//     "BLI",
//     "request_assigned_date",
//     "request_due_date"
//   ];

//   let html = "<table border='1'><tr>";
//   for (const col of columnOrder) {
//     html += `<th>${col}</th>`;
//   }
//   html += "</tr>";

//   for (const row of dataList) {
//     html += "<tr>";
//     for (const col of columnOrder) {
//       html += `<td>${row[col] ?? "Null"}</td>`;
//     }
//     html += "</tr>";
//   }

//   html += "</table>";
//   container.innerHTML = html;
// }

// // Show login popup
// function showLoginPopup() {
//   document.getElementById("loginModal").style.display = "block";
// }

// // Close login popup
// function closeLoginPopup() {
//   document.getElementById("loginModal").style.display = "none";
//   document.getElementById("loginError").innerText = "";
//   document.getElementById("username").value = "";
//   document.getElementById("password").value = "";
// }

// // Handle login validation
// function handleLogin() {
//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (username === "Admin" && password === "ssk123") {
//     // Download Excel
//     window.open("http://localhost:5000/download_report", "_blank");
//     closeLoginPopup();
//   } else {
//     document.getElementById("loginError").innerText = "Invalid credentials!";
//   }
// }




const baseUrl = "http://localhost:5000";

// ✅ Handle Ticket Submission with auditor_name included
document.getElementById("ticketForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const res = await fetch(`${baseUrl}/submit_ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
  e.target.reset();
});

// Handle Audit Data Submission (by Row Number)
document.getElementById("auditForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    row_number: formData.get("row_number"),
    // auditor_name: formData.get("auditor_name"),
    audit_comments: formData.get("audit_comments"),
    audit_status: formData.get("audit_status")
  };

  const res = await fetch(`${baseUrl}/add_audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (res.ok) {
    alert(result.message);
  } else {
    alert("❌ Error: " + result.message);
  }
  e.target.reset();
});

// ✅ Search by Ticket ID (filtered only incomplete records)
async function searchByTicketId() {
  const ticketId = document.getElementById("searchTicketId").value;
  const res = await fetch(`${baseUrl}/search_ticket?ticket_id=${ticketId}`);
  const result = await res.json();

  const showAllLink = document.getElementById("showAllLink");
  showAllLink.setAttribute("data-ticket-id", ticketId);

  if (Array.isArray(result) && result.length > 0) {
    showResults(result);
    showAllLink.style.display = "inline";
  } else {
    showResult(result);
    showAllLink.style.display = "none";
  }
}

// ✅ Show all rows for a ticket_id
async function showAllRowsForTicketId() {
  const ticketId = document.getElementById("showAllLink").getAttribute("data-ticket-id");
  const res = await fetch(`${baseUrl}/search_ticket_all?ticket_id=${ticketId}`);
  const result = await res.json();
  if (Array.isArray(result)) {
    showResults(result);
  } else {
    showResult(result);
  }
}

// Search by Row Number
async function searchByRowNumber() {
  const rowNumber = document.getElementById("searchRowNumber").value;
  const res = await fetch(`${baseUrl}/search_row?row_number=${rowNumber}`);
  const result = await res.json();
  showResult(result);
}

// Display result table (single object)
function showResult(data) {
  const container = document.getElementById("resultTable");
  if (data.message) {
    container.innerHTML = `<p>${data.message}</p>`;
    return;
  }

  const columnOrder = [
    "Row Number",
    "ticket_id",
    "ticket_name",
    "developer_name",
    "no_of_urls",
    "urls_list",
    "audit_type",
    "auditor_name",
    "audit_assigned_date",
    "audit_assigned_time",
    "audit_status",
    "audit_comments",
    "audit_completion_date",
    "audit_completion_time",
    "BLI",
    "request_assigned_date",
    "request_due_date"
  ];

  let html = "<table border='1'><tr>";
  for (const col of columnOrder) {
    html += `<th>${col}</th>`;
  }
  html += "</tr><tr>";
  for (const col of columnOrder) {
    html += `<td>${data[col] ?? "Null"}</td>`;
  }
  html += "</tr></table>";

  container.innerHTML = html;
}

// Display result table (multiple rows)
function showResults(dataList) {
  const container = document.getElementById("resultTable");
  if (!Array.isArray(dataList) || dataList.length === 0) {
    container.innerHTML = "<p>No records found.</p>";
    return;
  }

  const columnOrder = [
    "Row Number",
    "ticket_id",
    "ticket_name",
    "developer_name",
    "no_of_urls",
    "urls_list",
    "audit_type",
    "auditor_name",
    "audit_assigned_date",
    "audit_assigned_time",
    "audit_status",
    "audit_comments",
    "audit_completion_date",
    "audit_completion_time",
    "BLI",
    "request_assigned_date",
    "request_due_date"
  ];

  let html = "<table border='1'><tr>";
  for (const col of columnOrder) {
    html += `<th>${col}</th>`;
  }
  html += "</tr>";

  for (const row of dataList) {
    html += "<tr>";
    for (const col of columnOrder) {
      html += `<td>${row[col] ?? "Null"}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  container.innerHTML = html;
}

// Show login popup
function showLoginPopup() {
  document.getElementById("loginModal").style.display = "block";
}

// Close login popup
function closeLoginPopup() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("loginError").innerText = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// Handle login validation
function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "Admin" && password === "ssk123") {
    // Download Excel
    window.open("http://localhost:5000/download_report", "_blank");
    closeLoginPopup();
  } else {
    document.getElementById("loginError").innerText = "Invalid credentials!";
  }
}
