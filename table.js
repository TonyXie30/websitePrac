function onClickAddFlight() {
    let flightNo = document.querySelector('form input[name="flight-no"]').value;
    let origin = document.querySelector('form input[name="from"]').value;
    let destination = document.querySelector('form input[name="to"]').value;
    let year = document.getElementById("year");
    let yearN = year.options[year.selectedIndex].text;

    let month = document.getElementById("month");
    let monthN = month.options[month.selectedIndex].text;

    let day = document.getElementById("day");
    let dayN = day.options[day.selectedIndex].text;

    let dhour = document.getElementById("dhour");
    let dhourN = dhour.options[dhour.selectedIndex].text;
    let dminute = document.getElementById("dminute");
    let dminuteN = dminute.options[dminute.selectedIndex].text;

    let ahour = document.getElementById("ahour");
    let ahourN = ahour.options[ahour.selectedIndex].text;
    let aminute = document.getElementById("aminute");
    let aminuteN = aminute.options[aminute.selectedIndex].text;

    if (validateInput(flightNo, origin, destination)) {
        alert("Success!");
    }
}
function validateInput(flightNo, origin, destination) {
    let flightNoRegex = new RegExp(/^[A-Z0-9]{2}\d{3,4}$/);
    let airportCodeRegex = new RegExp(/^[A-Z]{3}$/);

    if (!flightNoRegex.test(flightNo)) {
        alert("Invalid Flight No.");
        return false;
    }
    if (!airportCodeRegex.test(origin)) {
        alert("Invalid origin airport code.");
        return false;
    }
    if (!airportCodeRegex.test(destination)) {
        alert("Invalid destination airport code.");
        return false;
    }

    return true;
}
function initial() {
    let year = document.getElementById("year");
    year.innerHTML = "";
    year.options.add(new Option("--", null));
    for (let i = 2000; i <= 2020; i++) {
        year.options.add(new Option(i, i));
    }

    let month = document.getElementById("month");
    month.innerHTML = "";
    month.options.add(new Option("--", null));

    let day = document.getElementById("day");
    day.innerHTML = "";
    day.options.add(new Option("--", null));

    let dhour = document.getElementById("dhour");
    dhour.innerHTML = "";
    dhour.options.add(new Option("--",null));
    for (let i=0;i<=23;i++){
        let str = String(i);
        if (i<10){
            str = "0" + str;
        }
        dhour.options.add(new Option(str,str));
    }
    let dminute = document.getElementById("dminute");
    dminute.innerHTML = "";
    dminute.options.add(new Option("--",null));
    for (let i=0;i<=59;i++){
        let str = String(i);
        if (i<10){
            str = "0" + str;
        }
        dminute.options.add(new Option(str,str));
    }

    let ahour = document.getElementById("ahour");
    ahour.innerHTML = "";
    ahour.options.add(new Option("--",null));
    for (let i=0;i<=23;i++){
        let str = String(i);
        if (i<10){
            str = "0" + str;
        }
        ahour.options.add(new Option(str,str));
    }
    let aminute = document.getElementById("aminute");
    aminute.innerHTML = "";
    aminute.options.add(new Option("--",null));
    for (let i=0;i<=59;i++){
        let str = String(i);
        if (i<10){
            str = "0" + str;
        }
        aminute.options.add(new Option(str,str));
    }
}
function setMonth() {
    let month = document.getElementById("month");
    month.innerHTML = "";
    month.options.add(new Option("--", null));
    for (let i = 1; i <= 12; i++) {
        let str = String(i);
        if (i<10){
            str = "0" + str;
        }
        month.options.add(new Option(str, str));
    }
}
function setDay() {
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day");
    let data = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // clear the items
    day.innerHTML = "";
    // add new items
    day.options.add(new Option("--", null));
    for (let i = 1; i <= data[month - 1]; i++) {
        let str = String(i);
        if (i<10){
            str = "0" + str;
        }
        day.options.add(new Option(str, str));
    }
    if (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) && month ===
        2) {
        day.options.add(new Option(29, 29));
    }
}




