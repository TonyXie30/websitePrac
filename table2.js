function formatDate() {
    window.onload=flatpickr("#datePicker", {
        dateFormat: "Y/m/d", // 指定日期格式
        enableTime: false,   // 禁用时间选择
        altInput: true,      // 显示自定义格式的日期
        altFormat: "Y/m/d",   // 自定义格式
        minDate:new Date().fp_incr(1),
    });
}

function formatTime() {
    window.onload=flatpickr("#timePicker",{
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });
}

function formatEndTime() {
    let startTime = document.getElementById("timePicker").value;
    flatpickr("#timeEnd",{
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        maxTime : "23:59",
        minTime : startTime
    });
}

function addRow() {
    let bodyObj = document.getElementById("mainframe");
    if (!bodyObj) {
        alert("Body of Table not Exist!");
        return;
    }
    let roomName = document.querySelector('form input[name="room-name"]').value;
    let radioType = document.querySelector('form input[name="group"]:checked').value;
    let department = document.querySelector('form input[id="departmentId"]').value;
    let date = document.getElementById("datePicker").value;
    let startTime = document.getElementById("timePicker").value;
    let endTime = document.getElementById("timeEnd").value;
    let loc = document.getElementById("Lo").value;
    let rom = document.getElementById("roomDetail").value;
    let duration = document.getElementById("max-duration").value;

    if (!check(roomName,department,duration,date,startTime,endTime,true))
        return;

    let rowCount = bodyObj.rows.length;
    let cellCount = bodyObj.rows[0].cells.length;
    bodyObj.style.display = ""; // display the tbody
    let newRow = bodyObj.insertRow(rowCount++);
    newRow.insertCell(0).innerHTML = roomName;
    newRow.insertCell(1).innerHTML = department;
    newRow.insertCell(2).innerHTML = radioType;
    newRow.insertCell(3).innerHTML = loc + " " + rom;
    newRow.insertCell(4).innerHTML = date;
    newRow.insertCell(5).innerHTML = startTime;
    newRow.insertCell(6).innerHTML = endTime;
    newRow.insertCell(7).innerHTML = duration+"h";
    newRow.insertCell(8).innerHTML = bodyObj.rows[0].cells[cellCount - 1].innerHTML; // copy the "delete" button
    bodyObj.rows[0].style.display = "none"; // hide first row

    closeTabular();
    clear();
}

function activeTabular() {
    let table = document.getElementById("popup");
    let lap = document.getElementById("overlay");
    lap.style.display = 'block'
    table.style.display = 'block';
}

function closeTabular(){
    let table = document.getElementById("popup");
    table.style.display = 'none';
    let lap = document.getElementById("overlay");
    lap.style.display = 'none';
    clear();
}
function check(roomName,department,duration,date,startTime,endTime,alertOrNot) {
    let message = "";
    let err = true;
    if (!new RegExp(/^[a-z]+[0-9]+$/i).test(roomName)){
        message+="Wrong room-name\n";
        err = false;
    }
    if (!new RegExp(/^[a-z]+$/i).test(department)){
        message+="Wrong department\n";
        err = false;
    }
    if (typeof duration !== 'number'){
        message+="Wrong duration\n";
        err = false;
    }
    if (date===""||startTime===""||endTime===""){
        message+="Wrong moment\n";
        err = false;
    }
    if (!err&&alertOrNot)
        alert(message);
    return err;
}

function removeRow(inputting) {
    if (!inputting) return;
    let parentTD = inputting.parentNode;
    let parentTR = parentTD.parentNode;
    let parentTBODY = parentTR.parentNode;
    parentTBODY.removeChild(parentTR);
}

function clear() {
    let radioType = document.querySelector('form input[name="group"]:checked');
    radioType.checked = false;
    let ele = document.getElementById("add-room").elements;
    for (let i=0;i<ele.length;i++){
        if (ele[i].type==="text")
            ele[i].value = "";
    }
}

function edit(inputting) {
    activeTabular();
    const row = inputting.closest('tr');
    const roomNameR = row.cells[0].textContent;
    const departmentR = row.cells[1].textContent;
    const typeR = row.cells[2].textContent;
    const location = row.cells[3].textContent;
    const dateR = row.cells[4].textContent;
    const startTimeR = row.cells[5].textContent;
    const endTimeR = row.cells[6].textContent;
    const maxDuration = row.cells[7].textContent;

    let roomName = document.querySelector('form input[name="room-name"]');
    let radioButton = document.querySelectorAll('form input[name="group"][type="radio"]');
    let department = document.querySelector('form input[id="departmentId"]');
    let date = document.getElementById("datePicker");
    let startTime = document.getElementById("timePicker");
    let endTime = document.getElementById("timeEnd");
    let loc = document.getElementById("Lo");
    let rom = document.getElementById("roomDetail");
    let duration = document.getElementById("max-duration");

    roomName.value = roomNameR;
    radioButton.forEach(radioButton => {
       if (radioButton.value === typeR){
           radioButton.checked = true;
       }
    });
    department.value = departmentR;
    date.innerHTML = flatpickr("#datePicker", {
        dateFormat: "Y/m/d",
        enableTime: false,
        altInput: true,
        altFormat: "Y/m/d",
        minDate:new Date().fp_incr(1),
        defaultDate:parseDate(dateR)
    });
    startTime.value = startTimeR;
    endTime.value = endTimeR;
    let result=splitLastWord(location)
    loc.value = result.restOfWords;
    rom.value = result.lastWord;
    duration.value = maxDuration.substring(0,maxDuration.length-1);

    document.getElementById("submit").addEventListener("click", function (event) {
        if (!check(roomName.value,department.value,duration.value,date.value,startTime.value,endTime.value,false)){
            return
        }
        removeRow(inputting);
    });
}
function parseDate(dateString) {
    // 使用正则表达式匹配 "YYYY/MM/DD" 格式的日期字符串
    const match = dateString.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);

    if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // 月份从0开始，所以要减1
        const day = parseInt(match[3], 10);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            return new Date(year, month, day);
        }
    }

    // 如果无法解析日期字符串，返回 null 或其他适当的值
    return null;
}
function splitLastWord(inputString) {
    const words = inputString.split(' ');
    if (words.length === 1) {
        return {
            lastWord: words[0],
            restOfWords: ''
        };
    }
    const lastWord = words.pop();
    const restOfWords = words.join(' ');
    return {
        lastWord: lastWord,
        restOfWords: restOfWords
    };
}