console.log("hola")
document.getElementById("submit").addEventListener("click", onSubmit);

function onSubmit(){
    console.log("yay")
}

$(document).ready(function () {
    //change selectboxes to selectize mode to be searchable
    $("select").select2();
});