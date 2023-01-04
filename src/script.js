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

  for (let c of data.data) {
    tableBody.appendChild(createContentHtml(c, data));

    /*.innerHTML = `<img src=${c.avatar}
     class="img-fluid img-thumbnail rounded-circle" > `;
    tableRow.appendChild(document.createElement("td")).innerHTML =`<b> ${c.first_name} ${c.last_name} </b><br> <i>  <a href="mailto:"> ${c.email}</a></i>`;
    
    tableRowHead.innerHTML =`# ${c.id} `;*/
  }
}

function createContentHtml(w) {
 
  const tableRow = document.createElement("tr");
  const tableRowHead = document.createElement("th");
  const img = document.createElement("img");
  const delbutton = document.createElement("button");

  tableRow.appendChild(tableRowHead);
  tableRowHead.scope = "row";

  const Id = tableRowHead;
  const pic = tableRow.appendChild(document.createElement("td"));
  const name = tableRow.appendChild(document.createElement("td"));
  const email = tableRow.appendChild(document.createElement("td"));
  const button = tableRow.appendChild(document.createElement("td"));

  delbutton.classList.add("btn","btn-sm" ,"btn-danger");
  delbutton.innerText = "Delete";

  button.appendChild(delbutton);
  Id.innerHTML = "# " + w.id;
  pic.appendChild(img);
  img.src = `${w.avatar}`;
  img.width = 100;
  img.classList.add("img-fluid", "img-thumbnail", "rounded-circle");

  name.innerHTML = "<b>" + w.first_name + " " + w.last_name + "</b>";
  name.appendChild(document.createElement("br"));
  name.innerHTML += "<i> <a href=mailto: > " + w.email + "</a> </i>";
  name.firstChild.style.cursor = "pointer";


  name.firstChild.onclick = () => {};

  delbutton.onclick=()=>{console.log("del")}

  email.innerHTML;

  return tableRow;
}
