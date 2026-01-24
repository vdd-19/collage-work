let products = JSON.parse(localStorage.getItem("products")) || [];
let bill = [];


function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
    let name = document.getElementById("pname").value;
    let qty = document.getElementById("pqty").value;
    let price = document.getElementById("pprice").value;

    if (!name || !qty || !price) {
        alert("Fill all fields");
        return;
    }

    products.push({ name, qty: Number(qty), price: Number(price) });
    saveProducts();
    displayProducts();

    document.getElementById("pname").value = "";
    document.getElementById("pqty").value = "";
    document.getElementById("pprice").value = "";
}

function displayProducts() {
    let list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach((p, index) => {
        list.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td><button onclick="addToBill(${index})">+</button></td>
                <td><button onclick="deleteProduct(${index})">X</button></td>
            </tr>
        `;
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    displayProducts();
}


function addToBill(index) {
    let product = products[index];
    let found = bill.find(b => b.name === product.name);

    if (found) {
        found.qty++;
        found.amount = found.qty * product.price;
    } else {
        bill.push({
            name: product.name,
            qty: 1,
            amount: product.price
        });
    }

    displayBill();
}

function displayBill() {
    let billList = document.getElementById("billList");
    billList.innerHTML = "";

    let subtotal = 0;

    bill.forEach(item => {
        subtotal += item.amount;
        billList.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.amount}</td>
            </tr>
        `;
    });

    let gst = subtotal * 0.18;
    let total = subtotal + gst;

    document.getElementById("subtotal").innerText = `Subtotal:$${subtotal}`;
    document.getElementById("gst").innerText = `GST(18%):$${gst.toFixed(2)}`;
    document.getElementById("total").innerText = `Total:$${total.toFixed(2)}`;
}


displayProducts();
