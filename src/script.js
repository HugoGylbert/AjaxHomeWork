var month_hu = [
  "Január",
  "Február",
  "Március",
  "Aprilis",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];
var day_hu = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];

var primaryData;
function loadAllData(data) {
  primaryData = data;

  console.log(primaryData);
}

function getData(API = "https://reqres.in/api/users/") {
  document.getElementById("placeholder").style.display = "block";

  fetch(API, {method: "GET"}).then(checkErrorsApi).then(showContent).catch(TopinfoFlag);
}

function deleteData(w) {
  document.getElementById("placeholder").style.display = "block";
  const DeleteUrl = `https://reqres.in/api/users/${w.id}`;
  fetch(DeleteUrl, {method: "DELETE"})
    .then((res) => {
      if (res.status !== 204) {
        throw new Error("Something went wrong, try it later.");
      } else {
        TopinfoFlag(`${w.first_name} ${w.last_name}'s data deleted!`, 5);
        document.getElementById("tbody").innerHTML = "";

        setTimeout(() => {
          getData();
        }, 3 * 1000);
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
      TopinfoFlag(`Connetion successful`, 2);
      return data.json();
      break;
    default:
      return data.json();
  }
}
function TopinfoFlag(e, t = 4) {
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
  return;
}
function showContent(data) {
  const tableBody = document.getElementById("tbody");
  primaryData = data;
  const placeholder = (document.getElementById("placeholder").style.display = "none");
  for (let c of data.data) {
    tableBody.appendChild(createContentHtml(c, data));
  }

  // try section -->

  /*
  const UserDbShow = 1;

  
  for (let i = 0; i < UserDbShow; i++) {
    for (let h = 0; h < data.data.length; h++) {
      
      tableBody.appendChild(createContentHtml(data.data[h], data));
      
    }
  }*/

}

function createContentHtml(w, data) {
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
  fetch(url, {method: "GET"})
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

      const ModalCardDiv = new bootstrap.Modal(document.getElementById("ModalCard"));
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
  const myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
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

function MatchDataInput(input, pattern, btn = undefined, text = "Not a valid input") {
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");

  if (btn !== undefined) {
    btn.classList.remove("disabled");
    btn.classList.remove("enabled");
  }

  const inputParent = input.parentNode;

  const tooltip = document.createElement("div");
  tooltip.classList.remove();

  if (input.value.match(pattern)) {
    input.classList.add("is-valid");
    return true;
  } else {
    tooltip.innerText = text;
    tooltip.classList.add("invalid-tooltip");
    inputParent.appendChild(tooltip);
    input.classList.add("is-invalid");
    if (btn !== undefined) {
      btn.classList.add("disabled");
    }

    return false;
  }
}
const namePattern = "^[A-ZÖÜÓŐÚÉÁŰÍ]{1}[a-zíöüóőúéáű]{1,15}$";
const emailPattern = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const httpPattern = "^https?://.*/.*.(png|gif|webp|jpeg|jpg)??.*$";
function modifApiData(w) {
  const modif = new bootstrap.Modal(document.getElementById("ModalModifyCard"));
  modif.show();

  const ModifHeader = document.getElementById("modifHeader");
  ModifHeader.innerHTML = `# ${w.id}  ${w.last_name} ${w.first_name} <br> Are you sure you want to modify? `;

  const Fname = document.getElementById("modifFName");
  Fname.value = w.first_name;

  Fname.onkeyup = () => {
    MatchDataInput(Fname, namePattern, modify, "Start uppercase, max 15 alphabetic character long");
  };
  const Lname = document.getElementById("modifLName");
  Lname.value = w.last_name;

  Lname.onkeyup = () => {
    MatchDataInput(Lname, namePattern, modify, "Start uppercase, max 15 alphabetic character long");
  };

  const mail = document.getElementById("modifEmail");
  mail.value = w.email;

  mail.onkeyup = () => {
    MatchDataInput(mail, emailPattern, modify, "Not valid email format");
  };

  const PicUrl = document.getElementById("modifURL");
  PicUrl.value = w.avatar;

  PicUrl.onkeyup = () => {
    MatchDataInput(PicUrl, httpPattern, modify, "Not valid Url format");
  };
  const modify = document.getElementById("ModifyBtn");
  MatchDataInput(Fname, namePattern, modify, "Start uppercase, max 15 alphabetic character long");
  MatchDataInput(Lname, namePattern, modify, "Start uppercase, max 15 alphabetic character long");
  MatchDataInput(mail, emailPattern, modify, "Not valid email format");
  MatchDataInput(PicUrl, httpPattern, modify, "Not valid Url format");
  modify.onclick = () => {
    modif.hide();
    document.getElementById("placeholder").style.display = "block";
    const f = fetch(`https://reqres.in/api/users/${w.id}`, {
      method: "PUT",
      headers: {"content-Type": "application/json;charset-utf-8"},
      body: {
        data: JSON.stringify({
          id: w.id,
          email: mail.value,
          first_name: Fname.value,
          last_name: Lname.value,
          avatar: PicUrl.value,
        }),
      },
    })
      .then(Mylog)
      .then((g) => {
        const date = new Date(Date.parse(g.updatedAt));
        const option = {weekday: "long"};
        const optionm = {month: "long"};
        const PrintDate_HU = `${date.getFullYear()}. ${month_hu[date.getMonth()]}  ${date.getDate()}., ${
          day_hu[date.getDay()]
        } ${date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours()}:${
          date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()
        }`;
        const PrintDate_EN = `${Intl.DateTimeFormat("en-US", option).format(date.getDay())}, ${Intl.DateTimeFormat(
          "en-US",
          optionm
        ).format(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${
          date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours()
        }:${date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()} `;
        console.log("modify: " +PrintDate_HU);
        console.log("modify: " +PrintDate_EN);
        TopinfoFlag(` Modify Success at: ${PrintDate_EN}`, 4);
      })
      .catch(TopinfoFlag);
    document.getElementById("tbody").innerHTML = "";
    setTimeout(() => {
      getData();
    }, 5 * 1000);
    return false;
  };
}
function Mylog(g) {
  if (g.status === 200 || g.status === 201) {
   
    return g.json();
  } else {
    console.log("nem ok");
    checkErrorsApi(g);
  }
}

function AddApiData(w) {
  let isValidFname = false;
  let isValidLname = false;
  let isValidmail = false;
  let isValidPicUrl = false;

  const Fname = document.getElementById("AddNewFName");
  Fname.value = "";

  Fname.onkeyup = () => {
    isValidFname = MatchDataInput(Fname, namePattern, modify, "Start uppercase, max 15 alphabetic character long");
    if ((isValidFname, isValidLname, isValidmail, isValidPicUrl == false)) {
      modify.classList.remove("enabled");
      modify.classList.add("disabled");
    } else {
      modify.classList.remove("disabled");
      modify.classList.add("enabled");
    }
  };
  const Lname = document.getElementById("AddNewLName");
  Lname.value = "";

  Lname.onkeyup = () => {
    isValidLname = MatchDataInput(Lname, namePattern, modify, "Start uppercase, max 15 alphabetic character long");
    if (isValidFname, isValidLname, isValidmail, isValidPicUrl == false) {
      modify.classList.add("disabled");
      modify.classList.remove("enabled");
    } else {
      modify.classList.remove("disabled");
      modify.classList.add("enabled");
    }
  };

  const mail = document.getElementById("AddNewEmail");
  mail.value = "";

  mail.onkeyup = () => {
    isValidmail = MatchDataInput(mail, emailPattern, modify, "Not valid email format");
    if ((isValidFname, isValidLname, isValidmail, isValidPicUrl == false)) {
      modify.classList.add("disabled");
      modify.classList.remove("enabled");
    } else {
      modify.classList.remove("disabled");
      modify.classList.add("enabled");
    }
  };

  const PicUrl = document.getElementById("AddNewURL");
  PicUrl.value = "";

  PicUrl.onkeyup = () => {
    isValidPicUrl = MatchDataInput(PicUrl, httpPattern, modify, "Not valid Url format");
    if ((isValidFname, isValidLname, isValidmail, isValidPicUrl == false)) {
      modify.classList.add("disabled");
      modify.classList.remove("enabled");
    } else {
      modify.classList.remove("disabled");
      modify.classList.add("enabled");
    }
  };

  const modify = document.getElementById("AddNewBtn");

  if (isValidFname,isValidLname, isValidmail, isValidPicUrl == false) {
    modify.classList.add("disabled");
    modify.classList.remove("enabled");
  } else {
    modify.classList.remove("disabled");
    modify.classList.add("enabled");
  }

  modify.onclick = () => {

    document.getElementById("placeholder").style.display = "block"; //load
    const f = fetch(`https://reqres.in/api/users/`, {
      method: "POST",
      headers: {"content-Type": "application/json;charset-utf-8"},
      body: {
        data: JSON.stringify({
          email: mail.value,
          first_name: Fname.value,
          last_name: Lname.value,
          avatar: PicUrl.value,
        }),
      },
    })
      .then(Mylog)
      .then((g) => {
        const date = new Date(Date.parse(g.createdAt));
        const option = {weekday: "long"};
        const optionm = {month: "long"};
        const PrintDate_HU = `${date.getFullYear()}. ${month_hu[date.getMonth()]}  ${date.getDate()}., ${
          day_hu[date.getDay()]
        } ${date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours()}:${
          date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()
        }`;
        const PrintDate_EN = `${Intl.DateTimeFormat("en-US", option).format(date.getDay())}, ${Intl.DateTimeFormat(
          "en-US",
          optionm
        ).format(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${
          date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours()
        }:${date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()} `;
        console.log("created: " +PrintDate_HU);
        console.log("created: " +PrintDate_EN);
        TopinfoFlag(` Create new user id is ${g.id}, \n Success at: ${PrintDate_EN}`, 5);
      })
      .catch(TopinfoFlag);
    document.getElementById("tbody").innerHTML = "";
    Lname.value = "";
    Lname.classList.remove("is-valid", "is-invalid");

    Fname.value = "";
    Fname.classList.remove("is-valid", "is-invalid");

    mail.value = "";
    mail.classList.remove("is-valid", "is-invalid");

    PicUrl.value = "";
    PicUrl.classList.remove("is-valid", "is-invalid");

    document.getElementById("collapsebutton").click();
    setTimeout(() => {
      getData();
    }, 6 * 1000);
    return false;
  };
}
