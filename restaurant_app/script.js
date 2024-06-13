const menu = {
  item1: { name: "Sandwich", cost: 100, category: "Snacks" },
  item2: { name: "Burger", cost: 150, category: "Snacks" },
  item3: { name: "Momos", cost: 150, category: "Snacks" },
  item4: { name: "Shahi Paneer", cost: 200, category: "Main Course" },
  item5: { name: "Butter Chicken", cost: 300, category: "Main Course" },
  item6: { name: "Gulab Jamun", cost: 50, category: "Desserts" },
  item7: { name: "Chocolate Brownie", cost: 100, category: "Desserts" },
  item8: { name: "Kaala Jamun", cost: 70, category: "Desserts" },
  item9: { name: "Coke", cost: 50, category: "Beverages" },
  item10: { name: "Chocolate Shake", cost: 70, category: "Beverages" },
  item11: { name: "Maaza", cost: 50, category: "Beverages" },
  item12: { name: "Vanilla", cost: 70, category: "Ice-cream" },
  item13: { name: "Strawberry", cost: 170, category: "Ice-cream" },
};

var tables = {
  table1: { cost: 0, items: 0, orders: {} },
  table2: { cost: 0, items: 0, orders: {} },
  table3: { cost: 0, items: 0, orders: {} },
  table4: { cost: 0, items: 0, orders: {} },
};
const len = Object.keys(tables).length;
const menuLen = Object.keys(menu).length;
var tableContent = document.getElementById("tables");
var menuContent = document.getElementById("menu");
displayTables();
displayMenu();
function displayTables() {
  for (let i = 1; i <= len; i++) {
    let { cost, items } = tables["table" + i];

    let tableItem = document.createElement("li");
    tableItem.className = "table";
    tableItem.id = `table${i}`;
    tableItem.onclick = function () {
      openPopUp(`table-${i}`);
    };
    tableItem.ondrop = function (event) {
      drop(event, "table" + i);
    };
    tableItem.ondragover = function (event) {
      allowDrop(event);
    };

    let h2 = document.createElement("h2");
    h2.textContent = "Table-" + i;

    let p = document.createElement("p");
    p.textContent = " Items : " + items + " | Total : " + cost.toFixed(2);

    tableItem.appendChild(h2);
    tableItem.appendChild(p);

    tableContent.appendChild(tableItem);
  }
}

function displayMenu() {
  const menuByCategory = new Map();
  for (let i = 1; i <= menuLen; i++) {
    const { name, cost, category } = menu["item" + i];
    if (!menuByCategory.has(category)) {
      menuByCategory.set(category, []);
    }
    menuByCategory.get(category).push({ name, cost });
  }
  let i = 1;

  function displayCategoryItems(category, items) {
    const categoryHeader = document.createElement("h2");
    categoryHeader.id = "category";
    categoryHeader.textContent = category;
    menuContent.appendChild(categoryHeader);

    for (const item of items) {
      const li = document.createElement("li");
      li.id = "item" + i;
      li.setAttribute("category", category);
      li.draggable = true;
      li.ondragstart = function (event) {
        drag(event);
      };

      const h2 = document.createElement("h2");
      h2.textContent = item.name;
      li.appendChild(h2);

      const costP = document.createElement("p");
      costP.textContent = item.cost + ".00";
      li.appendChild(costP);

      menuContent.appendChild(li);
      i++;
    }
  }

  for (const [category, items] of menuByCategory.entries()) {
    displayCategoryItems(category, items);
  }
}

function filterTables() {
  const input = document.getElementById("searchTable").value.toLowerCase();
  const target = document.getElementById("closeTable");
  input == ""
    ? target.classList.remove("target")
    : target.classList.add("target");
  const str = input.split("-");
  const st = str[0] + str[1];
  if (tables.hasOwnProperty(st)) {
    makeTableVisible(st);
  } else {
    tableContent.innerHTML = "";
    displayTables();
  }
}

function makeTableVisible(input) {
  const element = document.getElementById(input);
  element.classList.add("visible");
  for (let i = 1; i <= len; i++) {
    if (!(input == `table${i}`)) {
      const element = document.getElementById(`table${i}`);
      element.classList.add("invisible");
    }
  }
}

function filterItems() {
  const input = document.getElementById("searchMenu").value.toLowerCase();
  const target = document.getElementById("closeMenu");
  const categoriesToShow = new Set();

  input == ""
    ? target.classList.remove("target")
    : target.classList.add("target");

  for (let i = 1; i <= menuLen; i++) {
    const { name, category } = menu["item" + i];
    const itemName = name.toLowerCase();
    const itemCategory = category.toLowerCase();
    const item = document.getElementById(`item${i}`);

    if (itemName.includes(input) || itemCategory.includes(input)) {
      item.classList.add("visible");
      item.classList.remove("invisible");
      categoriesToShow.add(itemCategory);
    } else {
      item.classList.remove("visible");
      item.classList.add("invisible");
    }
  }

  const headings = document.querySelectorAll("h2#category");
  headings.forEach((heading) => {
    const headingText = heading.textContent.trim().toLowerCase();
    if (categoriesToShow.has(headingText)) {
      heading.classList.add("visible");
      heading.classList.remove("invisible");
    } else {
      heading.classList.add("invisible");
      heading.classList.remove("visible");
    }
  });
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event, tableName) {
  event.preventDefault();
  const ele = event.dataTransfer.getData("text");
  let item = menu[ele];
  if (tables[tableName]["orders"][ele] == undefined) {
    tables[tableName]["orders"][ele] = 1;
    tables[tableName].items += 1;
  } else {
    tables[tableName]["orders"][ele] += 1;
  }
  tables[tableName].cost += parseInt(item.cost);
  const tabCost = document.getElementById(tableName);
  const tot = tabCost.querySelector("p");
  tot.textContent =
    "Items : " +
    tables[tableName]["items"] +
    " | Total : " +
    tables[tableName].cost;
}

const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");

let currentTarget = null;
function openPopUp(target) {
  currentTarget = target;
  popup.classList.add("visible");
  popup.classList.remove("invisible");
  const pop = document.getElementById("pop");
  const t = target.split("-");
  const id = t[0] + t[1];
  const table = tables[id];

  let totalVar = table.cost;
  pop.textContent = target.toUpperCase() + " | " + " Order Details";
  const container = document.getElementById("container");
  const tbody = document.createElement("tbody");
  container.innerHTML = "";
  const headers = ["Item", "Price", "Quantity", "Total", ""];
  const headerRow = document.createElement("tr");
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  tbody.appendChild(headerRow);
  for (let item in table.orders) {
    if (table.orders.hasOwnProperty(item)) {
      const tr = document.createElement("tr");
      const menuItem = menu[item];
      const itemName = menuItem.name;
      const itemPrice = menuItem.cost;
      const itemQuantity = table.orders[item];

      const itemTotalPrice = itemPrice * itemQuantity;

      const td1 = document.createElement("td");
      td1.textContent = itemName;

      const td2 = document.createElement("td");
      td2.textContent = itemPrice;

      const td3 = document.createElement("td");
      const quantityInput = document.createElement("input");
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("min", "1");
      quantityInput.value = itemQuantity;
      quantityInput.addEventListener("input", function () {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity <= 0) {
          delete table.orders[item];
          tr.parentNode.removeChild(tr);
        } else {
          table.orders[item] = newQuantity;
          const newTotalPrice = newQuantity * itemPrice;
          itemTotalPriceTd.textContent = newTotalPrice.toFixed(2);
          updateTotalCost();
        }
      });
      td3.appendChild(quantityInput);

      const td4 = document.createElement("td");
      const itemTotalPriceTd = document.createTextNode(
        itemTotalPrice.toFixed(2)
      );
      td4.appendChild(itemTotalPriceTd);

      const td5 = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function () {
        delete table.orders[item];
        table.items -= 1;
        tbody.removeChild(tr);
        updateTotalCost();
      });
      td5.appendChild(deleteBtn);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tbody.appendChild(tr);
    }
  }
  container.appendChild(tbody);
  popup.appendChild(container);
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = "Total: " + totalVar.toFixed(2);
}

function updateTotalCost() {
  const t = currentTarget.split("-");
  const id = t[0] + t[1];
  let total = 0;
  let totalItems = 0;
  for (let item in tables[id].orders) {
    if (tables[id].orders.hasOwnProperty(item)) {
      const menuItem = menu[item];
      const itemPrice = menuItem.cost;
      const itemQuantity = tables[id].orders[item];
      if (itemQuantity > 0) {
        total += itemPrice * itemQuantity;
        totalItems += 1;
      } else {
        delete tables[id].orders[item];
      }
    }
  }
  tables[id].cost = total;
  tables[id].items = totalItems;
  document.getElementById(id).querySelector("p").textContent =
    " Items : " + totalItems + " | Total : " + total.toFixed(2);
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = "Total: " + total.toFixed(2);
}

closeBtn.addEventListener("click", function () {
  popup.classList.add("invisible");
  const t = currentTarget.split("-");
  const id = t[0] + t[1];
  const totalBill = tables[id].cost.toFixed(2);
  alert("Total Bill : Rs." + totalBill);
  const total = document.getElementById(id).querySelector("p");
  total.textContent = "Items: 0 | Total: 0.00";
  tables[id].cost = 0;
  tables[id].items = 0;
  tables[id].orders = {};
});

function removePopUp() {
  popup.classList.add("invisible");
  popup.classList.remove("visible");
}

function clearTableSearch() {
  const target = document.getElementById("closeTable");
  const input = document.getElementById("searchTable");
  input.value = "";
  target.classList.remove("target");
  target.classList.add("invisible");
  filterTables();
}

function clearMenuSearch() {
  const target = document.getElementById("closeMenu");
  const input = document.getElementById("searchMenu");
  input.value = "";
  target.classList.remove("target");
  target.classList.add("invisible");
  filterItems();
}
