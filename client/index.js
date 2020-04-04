document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

const btnAdd = document.querySelector("#btnAdd");

btnAdd.onclick = function () {
  const addItemName = document.querySelector("#addItemName");
  const name = addItemName.value;
  addItemName.value = "";

  const addItemQty = document.querySelector("#addItemQty");
  const qty = addItemQty.value;
  addItemQty.value = "";

  const addItemAmt = document.querySelector("#addItemAmt");
  const amount = addItemAmt.value;
  addItemAmt.value = "";

  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: name, qty: qty, amount: amount }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]));
};

function insertRowIntoTable(data) {
  const table = document.querySelector("table tbody");
  const checkItemTable = table.querySelector(".no-data");

  let tableHtml = "<tr>";

  data.forEach(function ({ id, name, qty, amount }) {
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${qty}</td>`;
    tableHtml += `<td>${amount}</td>`;
    tableHtml += `<td><button class="btn btn-sm btn-outline-info btnUpdate" data-id=${id}>Update</button></td>`;
    tableHtml += `<td><button class="btn btn-sm btn-outline-secondary btnDelete" data-id=${id}>Delete</button></td>`;
  });
  tableHtml += "</tr>";

  if (checkItemTable) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
    return;
  }
  let tableHtml = "";
  data.forEach(function ({ id, name, qty, amount }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${qty}</td>`;
    tableHtml += `<td>${amount}</td>`;
    tableHtml += `<td><button class="btn btn-sm btn-outline-info btnUpdate" data-id=${id}>Update</button></td>`;
    tableHtml += `<td><button class="btn btn-sm btn-outline-secondary btnDelete" data-id=${id}>Delete</button></td>`;
    tableHtml += "</tr>";

    table.innerHTML = tableHtml;
  });
}
