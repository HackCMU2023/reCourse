document.getElementById("submit").addEventListener("click", onSubmit);

function onSubmit(){
    selectedOptions = Array.from(document.getElementById("courseSelect").selectedOptions).map(({ value }) => value);
    data = {"course": selectedOptions}
    var ajax_params = {
        'url'     : "courseRecs",
        'type'    : "get",
        'data' : data,
        'success' : function(response){
            document.getElementById("output").innerHTML = response
        }
    }
    $.ajax( ajax_params )
}

function loadCourses(){
    document.getElementById("courseSelect").innerHTML = ""
    var ajax_params = {
        'url'     : "courseList",
        'type'    : "get",
        'success' : function(response){
            for(var i=0; i<response.length; i++){
                document.getElementById("courseSelect").innerHTML += "<option value=" + response[i] + ">" + response[i] + "</option>"
            }
        }
    }
    $.ajax( ajax_params )
}

$(document).ready(function () {
    //change selectboxes to selectize mode to be searchable
    loadCourses()
    $(".js-example-basic-multiple").select2();
});