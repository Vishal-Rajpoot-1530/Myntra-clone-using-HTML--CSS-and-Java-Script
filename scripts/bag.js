let bagItemsContainer = [];
onLoad();

function onLoad() {
  displayBagItems();
  displayBagSummary();
}

function displayBagItems() {
  if (bagItems.length == 0) {
    document.querySelector(".bag-page").innerHTML =
      `<h1><i>{Go to=> Home page}</i> You have not added any items-----</h1> <button class='continue-shopping'><a href="../index.html">Go Back </a></button>`;
    return;
  }
  let bagItemsContainerElement = document.querySelector(".bag-items-container");
  bagItemsContainer = [];
  bagItems.forEach((bagItem) => {
    items.map((item) => {
      if (bagItem.itemId == item.id)
        bagItemsContainer.push({ ...item, qnt: bagItem.qnt });
      // console.log(bagItemsContainer);
    });
  });

  let newHtml = "";
  bagItemsContainer.map((item) => {
    newHtml += ` <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs  ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days"> ${item.delivery_date}</span>
              </div>
              <div class='quantity' >Qnt (${item.qnt})</div>
            </div>


            <div class="remove-from-cart" onClick="removeItem(${item.id})">X</div>
          </div>`;
  });
  bagItemsContainerElement.innerHTML = newHtml;
}

function removeItem(itemId) {
  bagItems = bagItems.filter((item) => item.itemId != itemId);
  displayBagItems();
  showBagItemCount();
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");

  let totalMRP = 0;
  let discountOnMRP = 0;
  let convenienceFee = 99;
  let totalCurrentPrice = 0;

  bagItemsContainer.map((item) => {
    totalMRP += (item.original_price * item.qnt);
    totalCurrentPrice += (item.current_price * item.qnt);
  })

  discountOnMRP = totalMRP - totalCurrentPrice;
   console.log(totalMRP)
  bagSummaryElement.innerHTML = `
         <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${bagItems.length} Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"
                >-Rs ${discountOnMRP}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convenienceFee}</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value"> Rs  ${totalCurrentPrice+convenienceFee} </span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni" onClick='orderPlaced()'>PLACE ORDER</div>
          </button>
  `;
}

function orderPlaced() {
  document.querySelector('.bag-page').innerHTML = `
   <h2> Congratulation... your order has been placed successfully.</h2>
    <button class='continue-shopping'><a href="../index.html">continue shopping </a></button>
  `
  localStorage.clear();
  showBagItemCount();
}