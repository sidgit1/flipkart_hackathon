const form_data = document.querySelector("form")

form_data.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = document.getElementById("Product_name").selectedIndex
    const gender = document.getElementById("Gender").selectedIndex
    //const price = document.getElementById("Price").selectedIndex
    const timeline = document.getElementById("Timeline").selectedIndex
    const trends = document.getElementById("Trends").selectedIndex

    window.location.href = `./items.html?product=${product}&&gender=${gender}&timeline=${timeline}&trends=${trends}`;
})

