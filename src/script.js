function getData(API = "https://reqres.in/api/users/88") {
  fetch(API, {method: "GET"})
    .then(checkErrorsApi)
    .then((a) => {
      console.log(a);
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
    default:
      return data.json();
  }
}
function TopinfoFlag(e) {
  const alert = document.getElementById("Alert");
  const text = e.toString()
  
  if (text.indexOf("Error") ===  0) {
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
