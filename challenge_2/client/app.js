console.log(`HEY I'M WORKIN HERE!`);

$(document).ready(() => {
  $("#text-form").on("submit", (e) =>{
    e.preventDefault();
    var data = document.getElementById("json-text").value;
    textSubmitHandler(data);

  });

  var textSubmitHandler = (data) => {
    console.log(typeof data);
    $.ajax({
      url: '/upload_json',
      method: 'POST',
      dataType: 'text',
      data: {json: JSON.parse(data)},
      success: () => { console.log('success'); },
      error: () => { console.log('error'); }
    });
  }
})