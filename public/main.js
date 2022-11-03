const registerLink = document.querySelector(".register-link")
const loginLink = document.querySelector(".login-link")

const searchVal = document.querySelector("[data-search-input]")
const priceSort = document.querySelector("#sort-price")
const ratingSort = document.querySelector("#sort-rating")
const price = document.querySelector(".price")
const params = window.location.search
const sorting = new URLSearchParams(params).get("brand")

const titleName = document.querySelector(".title")
const imgSrc = document.querySelector(".image")
const feedInfo = document.querySelector(".feed-items")
const cart = document.querySelector("#cart")
const cartBox = document.querySelector("#box")
const fees = document.querySelector(".fees")

let baseUrl = "http://localhost:7000/api/products"


// ratingSort.addEventListener("click", console.log(ratingSort.value));








////////////////////////////////////







// redirect to registration form
registerLink.onclick = () => window.location = "./form1.html"

// redirect to login form
loginLink.onclick = () => {
    window.location = "./form2.html"
}

let basket = JSON.parse(localStorage.getItem("cart")) || [];






const feed = async() => {
    try {
        const { data } = await axios.get(baseUrl)
        const productCard = data.products
        let info = productCard.map((item) => {
            return `<div class="card-item" id="product-${item._id}" >
            <div><img src='${item.img}' alt="photo" class="image"></div>
            <div class="info" id="${item._id}">
                <h3 class="title">${item.brand}</h3>
                <p class="discription">${item.info}</p>
                <p class="price"><span>$</span> ${item.price}</p>
                <p class="rate">${item.rating}</p>
                <span class="add"  id="add">Add to Cart</span>
                <strong><a href="http://"></a>more..</strong>
            </div>
        </div>`
        }).join(" ")
        feedInfo.innerHTML = info
    } catch (error) {
        console.log(error.message)
    }
}
feed()

//search url

const editUrl = (e) => {
    const searchInput = e.target.value
    if (searchInput) {
        baseUrl = `http://localhost:7000/api/products/?brand=${searchInput}`
        feed()
    }
}
searchVal.addEventListener("input", editUrl);

////////////////////////////////////////////



//cart logic
const cartFeed = () => {
    if (basket !== []) {
        cartBox.innerHTML = basket.map((item) => {
            return ` <div class="cart-item" id=${item.id}>
                  <div class="cart-image"><img src=${item.src} alt="" class="image"></div>
                  <div class="cart-info">
                      <h3 class="title">${item.brand}</h3>
                      <p class="price"><span>$</span>${item.price}</p>
                      <div class="count">
                          <div class="minus-count"  data-id=${item.id}><i class="fa-light fa-minus"></i></div>
                          <div class="number" id=${item.id}>${item.count}</div>
                          <div class="plus-count" data-id=${item.id}><i class="fa-light fa-plus"></i></div>
                      </div>
                 </div> 
                <div class="delete" ><i class="fa-light fa-trash-can"></i></div>
              </div>`
        }).join(" ")
    }
    totalFees()
}
cart.addEventListener("click", cartFeed)


// increment from count in cart
const increment = (e) => {
    const plusHand = e.target.parentElement
    if (plusHand.classList.contains("plus-count")) {
        const newCount = basket.filter((item) => item.id === plusHand.dataset.id)
        newCount[0].count += 1
        cartFeed()
        localStorage.setItem("cart", JSON.stringify(basket));
    }
}
document.addEventListener("click", increment)

// decrement from count in cart
const decrement = (e) => {
    const handel = e.target.parentElement
    if (handel.classList.contains("minus-count")) {

        const newCount = basket.filter((item) => item.id === handel.dataset.id)

        if (newCount[0].count >= 1) {
            newCount[0].count -= 1
        } else {
            basket = basket.filter((x) => x.count !== 0)
        }
        cartFeed()
        localStorage.setItem("cart", JSON.stringify(basket));
    }
}
document.addEventListener("click", decrement)


const deleteItem = (e) => {
    const deletedCartItem = e.target.parentElement
    if (deletedCartItem.classList.contains(("delete"))) {
        basket = basket.filter((x) => x.id !== deletedCartItem.parentElement.id)
    }
    cartFeed()
    localStorage.setItem("cart", JSON.stringify(basket));
}
document.addEventListener("click", deleteItem)

// show subtotal to customer
const totalFees = () => {
    const total = basket.map((item) => item.count * item.price)
    const cartFees = total.reduce((acc, current) => {
        return acc + current;
    })
    fees.innerHTML = cartFees
}


// add to cart in localStorage
const showInCart = async(e) => {
    if (e.target.classList.contains("add")) {
        let selected = e.target.parentElement
        try {
            const { data } = await axios.get(`http://localhost:7000/api/products/${selected.id}`);
            const { name, price, img, info, brand, _id } = data.product;
            let search = basket.find((x) => x.id === selected.id)

            if (search == undefined) {
                basket.push({
                    id: selected.id,
                    count: 1,
                    price: price,
                    src: img,
                    brand: brand
                })
            } else {
                search.count += 1
            }
        } catch (error) {
            console.log(error.message)
        }
        window.localStorage.setItem("cart", JSON.stringify(basket));
        totalFees();
        cartFeed();
    }
}
document.addEventListener("click", showInCart)