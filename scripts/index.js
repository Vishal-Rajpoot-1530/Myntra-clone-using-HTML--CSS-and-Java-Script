// let item = {
//   image: "images/1.jpg",
//   stars: 4.5,
//   review: 1.4,
//   company_name: "carlton london",
//   item_name: "Rhodium-Plated cz Floral Studs",
//   current_price: 686,
//   original_price: 1045,
//   discount: 42,
// };

let bagItems;
onLoad();
function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  if (document.querySelector(".items-container")) displayItemsHome();
  showBagItemCount();
}

function showBagItemCount() {
  let counterElement = document.querySelector(".sup_script");
  if (bagItems.length == 0) {
    localStorage.clear();
    counterElement.style.visibility = "hidden";
  } else if (bagItems.length == 1) {
    counterElement.style.visibility = "visible";
  }
  counterElement.innerHTML = bagItems.length;
}

function addToBag(item) {
  // console.log(bagItems);
  let qnt = 1;
  if (bagItems.length == 0) {
    bagItems.push({ itemId: item, qnt: qnt });
     
  } else {
    for (let i = 0; i < bagItems.length; i++){
      if (bagItems[i].itemId == item) {
        bagItems[i].qnt += 1;
        localStorage.setItem("bagItems", JSON.stringify(bagItems));
        // console.log("i am inside the second if ");
        return;
      }
      // console.log("i am out side the second if ");
    }
    // console.log("i am outside the for loop ");
    bagItems.push({ itemId: item, qnt: qnt });
  }
  // console.log("i am out side the else ");
  

  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  showBagItemCount();
  // console.log(bagItems);
}

function displayItemsHome() {
  let itemsContainerElement = document.querySelector(".items-container");
  let newHtml = "";
  items.forEach((item) => {
    newHtml += ` 
        <div class="item-container">
        <img class="item-image" src=" ${item.image}" alt="item image ">
        <div class="rating">
        ${item.rating.stars} ⭐ || ${item.rating.count}
        </div>
        <div class="company-name">
        ${item.company}
        </div>
        <div class="item-name">
        ${item.item_name}
        </div>
        <div class="price">
        <span class="current-price">Rs${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% off)</span>
        </div>
                <button class="btn-add-bag"  onClick='addToBag(${item.id})'>Add to Bag</button>
                </div>`;
  });
  itemsContainerElement.innerHTML = newHtml;
}
