var Student_Info; //学生信息对象
var Student_Name_Arr = []; //学生姓名数组
var Vertical_Group = new Array(2, 2, 2, 2, 2);
var Column_Count; //座位表列数
var Row_Count; //座位表行数
var Group_Count; //座位表行数
const ipc = require('electron').ipcRenderer;

function Get_Student_Info() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            Student_Info = JSON.parse(this.responseText);
            Column_Count = Student_Info.Column;
            Row_Count = Student_Info.Row;
            Group_Count = Student_Info.Group;
            Print_Table_Of_Seats();
            for (let key in Student_Info.Info) {
                document.getElementById(Student_Info.Info[key].Coordinate).innerHTML = Student_Info.Info[key].Name;
                document.getElementById(Student_Info.Info[key].Coordinate).setAttribute("Group", Student_Info.Info[key].Group);
                Student_Name_Arr = Student_Name_Arr.concat(Student_Info.Info[key].Name);
            }
        }
    });

    xhr.open("GET", "https://randroca.deginx.com/api/Get_Info/");

    xhr.send();
}

function Print_Table_Of_Seats() {

    var column = 0;
    Vertical_Group.forEach(function (value, index) {
        column += value;
    });
    var Column_Id = 0;
    Vertical_Group.forEach(function (value, index) {
        Table_Of_Seats.innerHTML += '\
        <div  style="height:100%;width:' + toPercent((1 / column) * value) + ' !important;" class="wide column">\
        <div style="border-radius: 8px;text-align: center;top: 1rem;margin: auto;position: absolute;left: 1rem;right: 1rem;bottom: 0rem;" id="Medium_Group_' + index + '" class="ui grid ">\
        </div>\
        </div>';
        for (i = 0; i < value; i++) {
            //一列
            document.getElementById('Medium_Group_' + index + '').innerHTML += '\
            <div style="height:100%;" class="' + Chosen_Column_Width(value) + ' wide column ">\
            <div style="height:100%;" id="Column_' + Column_Id + '" class="ui one column grid ">\
            </div> \
            </div>';
            for (s = 0; s < Row_Count; s++) {
                document.getElementById('Column_' + Column_Id).innerHTML += '<div name="Student" onclick="Input_Student_Info(this);" id="Column_' + Column_Id + '_Row_' + s + '" style="background-color:#fff;margin:0.75em 0.25em;border-radius: 8px;box-shadow:2px 2px 5px #9c9c9c;" class="column">&#12288;</div>';
            }
            Column_Id += 1;
        }
    });
}

function randomHexColor() { 
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

function toPercent(point) {
    if (point == 0) {
        return 0;
    }
    var str = Number(point * 100).toFixed();
    str += "%";
    return str;
}

function Chosen_Column_Width(value) {
    return value == 2 ? 'eight' : 'sixteen';
}

function Chosen_Class() {
    $('.ui.modal')
        .modal({
            inverted: true,
            closable: false
        })
        .modal('show');
}

function Set_ClassID() {

}

function Input_Student_Info(div) {
    Chosen_Name = div.innerHTML;
    if (Chosen_Name != "&#12288;") {
        Card_Info_Change(Chosen_Name);
        Clear_Color();
        oName = document.getElementsByTagName("div");
        for (i = 0; i < oName.length; i++) {
            attr = oName.item(i).getAttribute("Group");
            Last_Group = Student_Info.Info[Chosen_Name].Group;
            if (attr && attr == Student_Info.Info[Chosen_Name].Group) {
                oName.item(i).style.backgroundColor = "#AEE1E1";
                oName.item(i).style.color = "#fff";
            }
        }
        document.getElementById(Student_Info.Info[Chosen_Name].Coordinate).style.backgroundColor = "#f52443";
        Chosen_Student_From_Group_Button.disabled = false;
    }

}

function Clear_Color() {
    Last_Group = null;
    Last_Chosen_Student_From_Group_Coordinate = null;
    if (Last_Medium_Group != null) {
        document.getElementById(Last_Medium_Group).style.backgroundColor = "";
    }
    oName = document.getElementsByTagName("div");
    for (i = 0; i < oName.length; i++) {
        attr = oName.item(i).getAttribute("name");
        if (attr && attr == "Student") {
            oName.item(i).style.backgroundColor = "white";
            oName.item(i).style.color = "#000000de";
        }
    }
}

function Card_Info_Change(name) {
    Name.innerHTML = name;
    Group.innerHTML = "第" + Student_Info.Info[name].Group + "组";
    var tmpImage = new Image();
    tmpImage.src = Student_Info.Info[name].Avatar;
    Avatar.src = tmpImage.src;
}

function No_Repeat_Arr_Add(id) {
    if ($('.ui.checkbox').checkbox('is checked')) {
        if (No_Repeat_Arr.indexOf(id) == -1) {
            No_Repeat_Arr = No_Repeat_Arr.concat(id);

        }
    }
}

function No_Repeat_Group_Arr_Add(id) {
    if ($('.ui.checkbox').checkbox('is checked')) {
        if (No_Repeat_Group_Arr.indexOf(id) == -1) {
            No_Repeat_Group_Arr = No_Repeat_Group_Arr.concat(id);

        }
    }
}

function Close() {
    console.log($('.ui.checkbox').checkbox());
    $('.ui.basic.modal')
        .modal({
            closable: false,
            onDeny: function () {
                ipc.send('hidden');
            },
            onApprove: function () {
                ipc.send('close');
            }
        })
        .modal('show');
}

function Reset() {
    No_Repeat_Group_Arr = [];
}