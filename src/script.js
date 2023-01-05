

function getData(API = "https://reqres.in/api/users/") {
    document.getElementById("placeholder").style.display = "block"
  fetch(API, {method: "GET"}).then(checkErrorsApi).then(showContent).catch(TopinfoFlag);
}
function deleteData (w){
    document.getElementById("placeholder").style.display = "block"
    const DeleteUrl = `https://reqres.in/api/users/${w.id}`;
    fetch(DeleteUrl, {method: "DELETE"})
      .then((res) => {
        if (res.status !== 204) {
          throw new Error("Something went wrong, try it later.");
        } else {
           TopinfoFlag((`${w.first_name} ${w.last_name}'s data deleted!`),5)
           document.getElementById("tbody").innerHTML=""
           getData()
        }
      })
      .catch(TopinfoFlag);
   
  };

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
function TopinfoFlag(e, t = 10) {
    const alert = document.getElementById("Alert");
    alert.style.visibility="visible"
    alert.style.display="block"
  const text = e.toString();

  if (text.indexOf("Error") === 0) {
    alert.classList.remove();
    alert.classList.add("alert","alert-danger","sticky-top" );
  } else {
    alert.classList.remove();
    alert.classList.add("alert", "alert-info","sticky-top");
  }
  alert.innerText = e;
  setTimeout(() => {
    alert.innerText = "";
    alert.style.visibility="hidden"
  alert.style.display="none"
  }, t * 1000);
  
}
function showContent(data) {
  const tableBody = document.getElementById("tbody");
console.log(data)
  const placeholder = (document.getElementById("placeholder").style.display = "none");
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

  delbutton.classList.add("btn", "btn-sm", "btn-danger");
  delbutton.innerText = "Delete";

  button.appendChild(delbutton);
  button.classList.add("align-middle");

  Id.innerHTML = "# " + w.id;
  Id.classList.add("align-middle");
  Id.style.fontSize = "xx-small";

  pic.appendChild(img);
  img.src = `${w.avatar}`;
  img.classList.add("img-fluid", "img-thumbnail", "rounded-circle");
  img.width = 75;

  name.classList.add("align-middle");
  name.innerHTML = "<b>" + w.first_name + " " + w.last_name + "</b>";
  name.appendChild(document.createElement("br"));
  name.innerHTML += "<i> <a href=mailto: > " + w.email + "</a> </i>";
  name.firstChild.style.cursor = "pointer";

  name.firstChild.onclick = () => {
    createCard(w);
  };

  delbutton.onclick = (e) => {
    RUSureDelete(w);
  };



  return tableRow;
}
function createCard(w) {

const body = document.body


const Carddiv =document.getElementById("ModalCard")

const CarddivContainer =document.getElementById("ModalCardContainer")
const CarddivBody =document.getElementById("CardModalBody")
const ModalCardDiv = new bootstrap.Modal(document.getElementById("ModalCard"))
const cardTitle = document.getElementById("cardTitle")
cardTitle.innerText= `${w.first_name} ${w.last_name} `
const pic = document.getElementById("modalCardPic")

pic.src=`${w.avatar}`





ModalCardDiv.show()
console.log(ModalCardDiv._isShown)

}
function RUSureDelete(w) {
  const myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  myModal.show();
  const ModalTitle = document.getElementById("staticBackdropLabel");
  const ModalBody = document.getElementById("ModalBody");
  const ModalDelete = document.getElementById("ModalDelete");

  ModalTitle.innerText = "Are you sure you want to delete?";
  ModalBody.innerText = `${w.first_name} ${w.last_name}'s all data will be delete! `;
  ModalDelete.onclick = () => {
    myModal.hide();
    deleteData(w)
  }

  

  return false;
}
