


const myForm = document.getElementById('web-search-form'); 

myForm.addEventListener('submit', (event) => {
  event.preventDeafult(); 
  
  const formData = newFormData(myForm); 

  console.log(formData) 
  changeHead(formData) 


})

function changeHead(data) {   

  var input_header = document.getElementById('Item-Requested')
  input_header.textContent = "Input: " + formData


}