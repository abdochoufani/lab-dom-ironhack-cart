function deleteItem(e) {
  var clickedShoppingItem = event.target.parentElement
  var container = document.getElementById("cart-container")
  container.removeChild(clickedShoppingItem)
}

function getPriceByProduct(itemNode) {
  var price = document.getElementsByClassName("price");
  var quantity = document.getElementsByTagName("input");
  var priceTotal=document.getElementsByClassName("product-price")[itemNode];
  var realPrice = Number(price[itemNode].innerText.replace(/[^0-9.-]+/g, ""));
  var finalPrice = realPrice * quantity[itemNode].value;
  priceTotal.innerText="$" + finalPrice;
  return finalPrice;

}


function getTotalPrice() {
  var finalPrice = []
  var items = document.getElementsByClassName("shopping-item");
  for (var i = 0; i < items.length; i++) {
    finalPrice.push(getPriceByProduct(i));
  }
  var total = finalPrice.reduce(function (a, b) {
    return a + b;
  })

  var totalPrice = document.getElementById("final-price");
  totalPrice.innerHTML = "$" + total;

}





function createNewItemRow(itemName, itemUnitPrice) {
  var list = document.getElementById("cart-container")
  var item = document.createElement("div");
  item.setAttribute("class", "shopping-item");
  var nameOfItem = document.createElement("p");
  nameOfItem.innerText = "ironBublle-"+itemName;
  item.append(nameOfItem);
  var price = document.createElement("span");
  price.setAttribute("class", "price");
  price.innerText = "$"+itemUnitPrice+".00";
  item.append(price);
  var label = document.createElement("label");
  label.innerText = "Quantity";
  var inputQuantity = document.createElement("input");
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("min", "0")
  inputQuantity.setAttribute("step", "1");
  label.append(inputQuantity);
  var product=document.createElement("span");
  product.setAttribute("class","product-price");
  product.innerText="$0"
  var deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "btn btn-delete");
  deleteBtn.innerText = "delete";
  deleteBtn.addEventListener("click", deleteItem);
  item.append(label);
  item.append(product);
  item.append(deleteBtn);
  list.append(item);


}

function createNewItem() {
  var nameOfItem = document.getElementById("new-name").value;
  var priceOfItem = document.getElementById("new-price").value;
  createNewItemRow(nameOfItem, priceOfItem);

}

window.onload = function () {
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');


  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = deleteItem;
  }
};