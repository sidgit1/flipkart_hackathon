const func = (data) => {
        let i=0;
        let str = "";
        const len = data.length;
        for(i=len-1;i>len-11;i--){
            str = str + `<div class="animal">
            <img class="pet-photo" src="${data[i].Images}">
            <h2 class="pet-name">${data[i].Name}</h2>
            <p>Brand: ${data[i].Brand}</p>
            <p>Price: ${data[i].Price}</p>
            <p>Avg Rating: ${data[i].Average_Rating}</p>
            <p>Normalized Score: ${data[i].Normalized_Score.toFixed(4)}</p>
            <p>Review: ${data[i].Review}</p>
        </div>`;
        }
        return str;
    }

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const str = this.responseText;
    let data = JSON.parse(str);
    document.getElementById("app").innerHTML = `
    <h1 class="app-title">Top 10 results out of ${data.length} entries</h1>
    ${func(data)}    
    <p class="footer">These ${data.length} items were added recently. Check back soon for updates.</p>
    `;

  }
};
xhttp.open("GET", "http://localhost:3000/item/"+window.location.search, true);
xhttp.send();

