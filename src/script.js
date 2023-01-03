function getData(API = "https://reqres.in/api/users?page=1") {
  fetch(API, { method: "GET" })
    .then(checkErrorsApi)
    .then(showContent)
    .catch(TopinfoFlag);
    
}
function checkErrorsApi(data) {
  switch (data.status) {
    case 404:
      throw new Error("Nem található a keresett cím: " + data.url);
      break;
    case 500:
      throw new Error("Server Error");
      break;
    case 200:
      return data.json();
      break;
    default:
      return data.json();
  }
}
function TopinfoFlag(e) {
  const alert = document.getElementById("Alert");
  const text = e.toString();

  if (text.indexOf("Error") === 0) {
    alert.classList.remove();
    alert.classList.add("alert", "alert-danger");
  } else {
    alert.classList.remove();
    alert.classList.add("alert", "alert-info");
  }
  alert.innerText = e;
  setTimeout(() => {
    alert.innerText = "";
    alert.style.display = "none";
  }, 10 * 1000);
}
function showContent(data) {
  const tableBody = document.getElementById("tbody");
  const buttonTD = document.createElement("td")
  const delbutton = document.createElement("button")
  for (let c of data.data) {
    createContentHtml(c)

    const tableRow = document.createElement("tr");
    const tableRowHead = document.createElement("th");
    tableRow.appendChild(tableRowHead);
    tableRowHead.scope = "row";

    tableBody.appendChild(tableRow);
    tableRow.appendChild(document.createElement("td")).innerHTML = `<img src=${c.avatar}
     class="img-fluid img-thumbnail rounded-circle" height=auto width=75vw > `;
    tableRow.appendChild(document.createElement("td")).innerHTML =`<b> ${c.first_name} ${c.last_name} </b><br> <i>  <a href="mailto:"> ${c.email}</a></i>`;
    
    tableRowHead.innerHTML =`# ${c.id} `;
  }

  
}

function createContentHtml (w)
{
console.log(w)
}