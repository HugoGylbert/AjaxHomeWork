function getData(API = "https://reqres.in/api/users/") {
  document.getElementById("placeholder").style.display = "block";

  fetch(API, { method: "GET" })
    .then(checkErrorsApi)
    .then(showContent)
    .catch(TopinfoFlag);
}
function deleteData(w) {
  document.getElementById("placeholder").style.display = "block";
  const DeleteUrl = `https://reqres.in/api/users/${w.id}`;
  fetch(DeleteUrl, { method: "DELETE" })
    .then((res) => {
      if (res.status !== 204) {
        throw new Error("Something went wrong, try it later.");
      } else {
        TopinfoFlag(`${w.first_name} ${w.last_name}'s data deleted!`, 5);
        document.getElementById("tbody").innerHTML = "";
        getData();
      }
    })
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
function TopinfoFlag(e, t = 10) {
  const alert = document.getElementById("Alert");
  alert.style.visibility = "visible";
  alert.style.display = "block";
  const text = e.toString();

  if (text.indexOf("Error") === 0) {
    alert.classList.remove();
    alert.classList.add("alert", "alert-danger", "sticky-top");
  } else {
    alert.classList.remove();
    alert.classList.add("alert", "alert-info", "sticky-top");
  }
  alert.innerText = e;
  setTimeout(() => {
    alert.innerText = "";
    alert.style.visibility = "hidden";
    alert.style.display = "none";
  }, t * 1000);
}
function showContent(data) {
  const tableBody = document.getElementById("tbody");

  const placeholder = (document.getElementById("placeholder").style.display =
    "none");
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
  const url = `https://reqres.in/api/users/${w.id}`;
  fetch(url, { method: "GET" })
    .then(checkErrorsApi)
    .then((d) => {
      const newFetchData = d.data;

      const delBTN = document.getElementById("delBtn");
      delBTN.classList.add("btn", "btn-danger", "float-end", "btn-sm");
      delBTN.innerText = "Delete";
      delBTN.onclick = () => {
        RUSureDelete(newFetchData);
        ModalCardDiv.hide();
      };

      const refreshBTN = document.getElementById("refreshBTN");
      refreshBTN.classList.add("btn", "btn-warning", "float-start", "btn-sm");
      refreshBTN.innerText = "Modify";

      refreshBTN.onclick = () => {
        modifApiData(w);
        ModalCardDiv.hide();
      };

      const CarddivBody = document.getElementById("ModalP");
      CarddivBody.innerHTML = `<i><a href=mailto:>  ${newFetchData.email}</a></i>`;

      const ModalCardDiv = new bootstrap.Modal(
        document.getElementById("ModalCard")
      );
      const cardTitle = document.getElementById("cardTitle");
      cardTitle.innerText = `${newFetchData.first_name} ${newFetchData.last_name} `;

      const pic = document.getElementById("modalCardPic");
      pic.src = `${newFetchData.avatar}`;

      ModalCardDiv.show();
      // console.log(ModalCardDiv._isShown);
    })

    .catch(TopinfoFlag);
}
function RUSureDelete(w) {
  const myModal = new bootstrap.Modal(
    document.getElementById("staticBackdrop")
  );
  myModal.show();
  const ModalTitle = document.getElementById("staticBackdropLabel");
  const ModalBody = document.getElementById("ModalBody");
  const ModalDelete = document.getElementById("ModalDelete");

  ModalTitle.innerText = "Are you sure you want to delete?";
  ModalBody.innerText = `${w.first_name} ${w.last_name}'s all data will be deleted! `;
  ModalDelete.onclick = () => {
    myModal.hide();
    deleteData(w);
  };

  return false;
}
function modifApiData(w) {
  const modif = new bootstrap.Modal(document.getElementById("ModalModifyCard"));
  modif.show();

  const ModifHeader = document.getElementById("modifHeader");
  ModifHeader.innerHTML = `# ${w.id}  ${w.last_name} ${w.first_name} <br> Are you sure you want to modify? `;

  const Fname = document.getElementById("modifFName");
  Fname.value = w.first_name;
  const Lname = document.getElementById("modifLName");
  Lname.value = w.last_name;
  const mail = document.getElementById("modifEmail");
  mail.value = w.email;
  const PicUrl = document.getElementById("modifURL");
  PicUrl.value = w.avatar;
  const modify = document.getElementById("ModifyBtn");

  modify.onclick = () => {
    modif.hide();
    const f = fetch(`https://reqres.in/api/users/${w.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json;charset-utf-8" },
      body:{

          data: JSON.stringify({
              id: w.id,
              email: "mail.value",
              first_name: Fname.value,
              last_name: Lname.value,
              avatar: PicUrl.value,
            }),
        }
    })
      .then(checkErrorsApi)
      .then(Mylog)
        .catch(TopinfoFlag);
  };
}
function Mylog (g) {
console.log(g)
}
