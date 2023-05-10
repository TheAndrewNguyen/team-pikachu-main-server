const form = document.querySelector('web-search-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  




  // send form data to server using fetch()
  fetch('/submit-form', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      if (response.ok) {
        console.log('Form data submitted successfully');
        // do something with the response (if necessary)
      } else {
        console.error('Failed to submit form data');
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });




});
