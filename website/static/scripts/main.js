var count = 1
document.getElementById("submit").addEventListener("click", onSubmit);
document.getElementById("add").addEventListener("click", addCourseDiv);

function addCourseDiv(){
    count++;

    var innerDiv = document.createElement('div');
    innerDiv.className = 'rating' + count
    innerDiv.innerHTML = "Select Course: <select id='courseSelect"+count+"' class='js-example-basic-single' style='width:200px;'></select><br>"
    +"<label for='r'"+count+"'>Rating (between 1 and 5):</label>"
    +"<input type='number' id='r"+count+"' name='r"+count+"'min='1' max='5'><br>"
    // +"<button id='delete"+count+"'>Delete course!</button>"
    +"<hr>"
    document.getElementById("CourseRatings").appendChild(innerDiv);
    // document.getElementById("CourseRatings").innerHTML += 
    // "<div class=`rating"+count+"`>Select Course: <select id='courseSelect"+count+"'  style='width:200px;'></select><br>"
    //  +"<label for='r'"+count+"'>Rating (between 1 and 5):</label>"
    //  +"<input type='number' id='r"+count+"' name='r"+count+"'min='1' max='5'><br>"
    //  +"<button id='delete"+count+"'>Delete course!</button>"
    //  +"<hr></div>"
     var cname = "courseSelect"+count
    //  $("#"+cname).select2();
     loadCourses(cname)
}

function onSubmit(){
    // selectedOptions = Array.from(document.getElementById("courseSelect").selectedOptions).map(({ value }) => value);
    data = []
    for(var i=1; i<=count; i++){
        if(document.getElementById("courseSelect"+i)!= null){
            var tcourse = document.getElementById("courseSelect"+i).value
            var trank = document.getElementById("r"+i).value
            data.push({"course": tcourse, "score": trank})
        }
    }
    console.log(data)
    var ajax_params = {
        'url'     : "courseRecs",
        'type'    : "get",
        'data' : {"data": data},
        'success' : function(response){
            document.getElementById("output").innerHTML = response
        }
    }
    $.ajax( ajax_params )
}
function loadCourses(idname){
    // document.getElementById(idname).innerHTML = ""
    var ajax_params = {
        'url'     : "courseList",
        'type'    : "get",
        'success' : function(response){
            
            for(var i=0; i<response.length; i++){
                var option = document.createElement('option');
                option.value = response[i]
                option.text = response[i]
                list = document.getElementById(idname);
                // console.log(list)
                list.add(option);
                // list.innerHTML += "<option value=" + response[i] + ">" + response[i] + "</option>"
                // document.getElementById(idname).append(response[i])
                // document.getElementById(idname).innerHTML += "<option value=" + response[i] + ">"
            }
            $(".js-example-basic-single").select2();
        }
    }
    $.ajax( ajax_params )
}

$(document).ready(function () {
    //change selectboxes to selectize mode to be searchable
    loadCourses("courseSelect1")
    // $(".js-example-basic-single").select2();
});