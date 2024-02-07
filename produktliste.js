const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  console.log(products);
  //looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  //fang template
  const template = document.querySelector("#smallProductTemplate").content;
  //lav en kopi
  const copy = template.cloneNode(true);
  //ændre indhold
  copy.querySelector(".produktnavn").textContent = product.productdisplayname;
  copy.querySelector(".brand").textContent = product.brandname;
  copy.querySelector(".price span").textContent = product.price;
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  if (!product.soldout) {
    //produktet er udsolgt
    copy.querySelector("soldout").remove();
  }
  if (!product.discount) {
    copy.querySelector("discount").remove();
  }

  copy.querySelector(".read-more").setAttribute("href", `produkt.html?id=${product.id}`);

  //appende
  document.querySelector("main .container_1").appendChild(copy);
}
/*
<article class="smallProduct soldOut">
  <img src="img/1573.webp" alt="Sahara Team India Fanwear Round Neck Jersey" />
  <h2>Sahara Team India Fanwear Round Neck Jersey</h2>
  <p class="subtle">Tshirts / Nike</p>
  <p class="price">
    <span>Prev.</span>DKK 15955,-
  </p>
  <div class="discounted">
    <p>Now DKK 1560</p>
    <p>-34%</p>
  </div>
  <a href="produkt.html">Read more</a>
</article>;
  
  /*
  {
  "id": 1163,
  "gender": "Men",
  "category": "Apparel",
  "subcategory": "Topwear",
  "articletype": "Tshirts",
  "season": "Summer",
  "productionyear": 2011,
  "usagetype": "Sports",
  "productdisplayname": "Sahara Team India Fanwear Round Neck Jersey",
  "price": 895,
  "discount": null,
  "brandname": "Nike",
  "soldout": 0
*/
