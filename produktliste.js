const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
let urlMod = "";
if (category) {
  urlMod = "?category=" + category;
}
fetch("https://kea-alt-del.dk/t7/api/products/" + urlMod)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  // looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  // fang template
  const template = document.querySelector("#smallProductTemplate").content;
  // lav en kopi
  const copy = template.cloneNode(true);
  // ændre indhold
  copy.querySelector(".produktnavn").textContent = product.productdisplayname;
  copy.querySelector(".brand").textContent = product.brandname;
  copy.querySelector(".price span").textContent = product.price;
  copy.querySelector(".discount span").textContent = product.discount;
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  if (!product.soldout) {
    // produktet er ikke udsolgt
    copy.querySelector(".soldout").remove();
  }
  if (!product.discount) {
    // produktet har ingen rabat
    copy.querySelector(".discount").remove();
  }
  copy.querySelector(".read-more").setAttribute("href", `produkt.html?id=${product.id}`);

  // appende
  document.querySelector("main .container_1").appendChild(copy);
}
