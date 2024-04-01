const name1 = document.getElementById('name')
const email = document.getElementById('email')
const message = document.getElementById('message')
const chat = document.querySelector('.bubble')
const formbuttn = document.getElementById('formbuttn')
//console.log(form)
name1.addEventListener("blur", (event) => {
    if(name1.value){
    const name_array = name1.value.split(" ")
    console.log(name1.value)
    chat.innerHTML = "";
    chat.innerHTML = "Hey! <span style = 'color: rgba(229,214,99,1);'>" +name_array[0]+ "</span>";
    //chat.appendChild(document.createTextNode("Hey! " + name_array[0]));
    }
    else{
        chat.innerHTML = "";
        chat.appendChild(document.createTextNode("Do you mind telling me you name!!"));
    }
  });
  formbuttn.addEventListener('click', (event) => {
    console.log(1)
    if(name1.value === '' || name1.value == null || email.value === '' || email.value == null 
    || message.value === '' || message.value == null){
        chat.innerHTML = "";
        chat.appendChild(document.createTextNode("And they say humans are more intelligent than apes"));
    }
  })
