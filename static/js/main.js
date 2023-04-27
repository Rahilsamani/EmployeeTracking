
// Timer ke variables
let timer ;
let sec = 0 ;
let min = 0 ;
let hour = 0 ;

// DOM for timer
let start_btn = document.getElementById("start");
let reset_btn = document.getElementById("reset");
let stop_btn = document.getElementById("stop");
let timer_element = document.getElementById("timer");

// variables for table
let srNo = 0;
let inTime ;

// adding eventlistner, so that when start button clicked it will run the timer
start_btn.addEventListener("click", function()
{
    let today = new Date();
    inTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    timer = setInterval(TimeHandler, 1000);
    reset_btn.disabled = true;
});


// adding eventlistner, so that when stop button clicked it will stop the timer
stop_btn.addEventListener("click", function()
{
    timer = clearInterval(timer);
    insertElement();
    reset_btn.disabled = false;
});


// adding eventlistner, so that when start button clicked it will reset the timer
reset_btn.addEventListener("click", function()
{
    timer = clearInterval(timer);
    reset_btn.disabled = true;
    sec = 0 ;
    min = 0 ;
    hour = 0 ;
    timer_element.innerHTML = "00:00:00" ;
});


// function used for handling time i.e. when sec,min == 60
function TimeHandler()
{
    sec++;

    if(sec==60)
    {
        sec = 0 ;
        min++; 
    }
    if(min==60)
    {
        min = 0 ;
        hour++;
    }
    DisplayTime();
}


// display time is used to document the time beautifully
function DisplayTime()
{
    let sec_doc = sec ;
    let min_doc = min ;
    let hour_doc = hour ;

    if(sec<10)
    {
        sec_doc = "0"+sec ;
    }

    if(min<10)
    {
        min_doc = "0"+min ;
    }

    if(hour<10)
    {
        hour_doc = "0"+hour ;
    }

    timer_element.innerHTML = hour_doc + ":" + min_doc + ":" + sec_doc ;
}


// this function is used to insert the data in the table
function insertElement(){

    srNo = srNo + 1

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let today = new Date();
    let outTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


    // Find a <table> element with id="myTable":
    var table = document.getElementById("myTable");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(srNo);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);


    // Add some text to the new cells:
    cell1.innerHTML = srNo;
    cell2.innerHTML = day + "-" + month + "-" + year;
    cell3.innerHTML = inTime;
    cell4.innerHTML = outTime;
}
