const mydata= fetch("https://reqres.in/api/users/1",{method:"GET"}).then((data)=>{console.log(data.json())})
console.log(mydata)