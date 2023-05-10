


const myForm = document.getElementById('web-search-form'); 

myForm.addEventListener('submit', function(event){
  
  const formData = newFormData(myForm); 




  console.log(formData) 
  return changeHead(formData) 


})

function changeHead(formData) {   

    var input_header = document.getElementById('Item-Requested')
    input_header.textContent = "Input: " + formData 
  
  
  }   