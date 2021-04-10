var Chosen_Student_Button_State = 0;
var Chosen_Student_t;
var Chosen_Group_t;
var Chosen_Student_From_Group_t;
var Chosen_Group_Button_State = 0;
var Last_Chosen_Student_From_Group_Coordinate;
var Last_Group;
var Last_Medium_Group;
var Chosen_Student_From_Group_Button_State = 0;
var Chosen_Medium_Group_Button_State = 0;
var Chosen_Medium_Group_t;
var No_Repeat_Arr = [];
var No_Repeat_Group_Arr = [];
var attr;
var oName;
var Last_ID;
var Random_Math;
var Chosen_Name;
var i;
var s;
var Chosen_Student_From_Group_Arr;

function Chosen_Student() {
    if (Chosen_Student_Button_State == 0) {
        Chosen_Group_Button.disabled = true;
        Chosen_Student_From_Group_Button.disabled = true;
        Chosen_Medium_Group_Button.disabled = true;
        clearInterval(Chosen_Student_t);
        Chosen_Student_t = setInterval(function () {
            // console.log(1);
            Random_Math = Math.round(Math.random() * (Student_Name_Arr.length - 1));
            Chosen_Name = Student_Name_Arr[Random_Math];
            while (No_Repeat_Arr.indexOf(Student_Info.Info[Chosen_Name].Coordinate) > -1) {
                Random_Math = Math.round(Math.random() * (Student_Name_Arr.length - 1));
                Chosen_Name = Student_Name_Arr[Random_Math];
            }
            Card_Info_Change(Chosen_Name);
            Clear_Color();
            document.getElementById(Student_Info.Info[Chosen_Name].Coordinate).style.backgroundColor = "#AEE1E1";
            document.getElementById(Student_Info.Info[Chosen_Name].Coordinate).style.color = "#fff";
            Last_ID = Student_Info.Info[Chosen_Name].Coordinate;
        }, 20);
        Chosen_Student_Button.innerHTML = "停止";
        Chosen_Student_Button_State = 1;
    } else {
        if (Prepare_Chosen_Student.length != 0) {
            Clear_Color();
            Card_Info_Change(Prepare_Chosen_Student[0]);
            document.getElementById(Student_Info.Info[Prepare_Chosen_Student[0]].Coordinate).style.backgroundColor = "#AEE1E1";
            document.getElementById(Student_Info.Info[Prepare_Chosen_Student[0]].Coordinate).style.color = "#fff";
            Last_ID = Student_Info.Info[Prepare_Chosen_Student[0]].Coordinate;
            Prepare_Chosen_Student.remove(Prepare_Chosen_Student[0]);
        }
        No_Repeat_Arr_Add(Last_ID);
        Chosen_Student_Button_State = 0;
        Chosen_Student_Button.innerHTML = "随机抽取学生";
        clearInterval(Chosen_Student_t);
        Chosen_Group_Button.disabled = false;
        Chosen_Medium_Group_Button.disabled = false;
    }
}


function Chosen_Group() {
    if (Chosen_Group_Button_State == 0) {
        Chosen_Student_Button.disabled = true;
        Chosen_Student_From_Group_Button.disabled = true;
        Chosen_Medium_Group_Button.disabled = true;
        clearInterval(Chosen_Group_t);
        Chosen_Group_t = setInterval(function () {
            // console.log(1);
            Random_Math = Math.round(Math.random() * (Group_Count));
            while (Random_Math == 0) {
                Random_Math = Math.round(Math.random() * (Group_Count));
            }
            while (No_Repeat_Group_Arr.indexOf(Random_Math) > -1) {
                if (No_Repeat_Group_Arr.indexOf(Random_Math) == Group_Count - 2)
                    Reset();
                Random_Math = Math.round(Math.random() * (Group_Count));
                while (Random_Math == 0) {
                    Random_Math = Math.round(Math.random() * (Group_Count));
                }
            }
            Name.innerHTML = "第" + Random_Math + "组";
            Group.innerHTML = "第" + Random_Math + "组";
            var tmpImage = new Image();
            tmpImage.src = "http://randroca.deginx.com/Pic/Math/number-" + Random_Math + ".png";
            Avatar.src = tmpImage.src;
            Clear_Color();
            var oName = document.getElementsByTagName("div");
            for (i = 0; i < oName.length; i++) {
                var attr = oName.item(i).getAttribute("Group");
                if (attr && attr == Random_Math) {
                    oName.item(i).style.backgroundColor = "#AEE1E1";
                    oName.item(i).style.color = "#fff";
                }
            }
            Last_Group = Random_Math;
        }, 30);
        Chosen_Group_Button.innerHTML = "停止";
        Chosen_Group_Button_State = 1;
    } else {
        No_Repeat_Group_Arr_Add(Last_Group);
        Chosen_Group_Button_State = 0;
        Chosen_Group_Button.innerHTML = "随机抽取小组";
        clearInterval(Chosen_Group_t);
        Chosen_Student_Button.disabled = false;
        Chosen_Student_From_Group_Button.disabled = false;
        Chosen_Medium_Group_Button.disabled = false;
    }
}

function Chosen_Student_From_Group() {
    if (Last_Group != null) {
        Chosen_Student_From_Group_Arr = [];
        oName = document.getElementsByTagName("div");
        for (i = 0; i < oName.length; i++) {
            attr = oName.item(i).getAttribute("Group");
            if (attr && attr == Last_Group) {
                Chosen_Student_From_Group_Arr = Chosen_Student_From_Group_Arr.concat(oName.item(i).innerHTML);

            }
        }
        if (Chosen_Student_From_Group_Button_State == 0) {
            Chosen_Group_Button.disabled = true;
            Chosen_Student_Button.disabled = true;
            Chosen_Medium_Group_Button.disabled = true;
            clearInterval(Chosen_Student_From_Group_t);
            Chosen_Student_From_Group_t = setInterval(function () {
                Random_Math = Math.round(Math.random() * (Chosen_Student_From_Group_Arr.length - 1));
                Chosen_Name = Chosen_Student_From_Group_Arr[Random_Math];
                Card_Info_Change(Chosen_Name);
                if (Last_Chosen_Student_From_Group_Coordinate != null) {
                    document.getElementById(Last_Chosen_Student_From_Group_Coordinate).style.backgroundColor = "#AEE1E1";
                }
                document.getElementById(Student_Info.Info[Chosen_Name].Coordinate).style.backgroundColor = "#f52443";
                Last_Chosen_Student_From_Group_Coordinate = Student_Info.Info[Chosen_Name].Coordinate;
            }, 30);
            Chosen_Student_From_Group_Button.innerHTML = "停止";
            Chosen_Student_From_Group_Button_State = 1;
        } else {
            Chosen_Student_From_Group_Button_State = 0;
            Chosen_Student_From_Group_Button.innerHTML = "小组内抽取学生";
            clearInterval(Chosen_Student_From_Group_t);
            Chosen_Group_Button.disabled = false;
            Chosen_Student_Button.disabled = false;
            Chosen_Medium_Group_Button.disabled = false;
        }
    }

}

function Chosen_Medium_Group() {
    if (Chosen_Medium_Group_Button_State == 0) {
        Clear_Color();
        Chosen_Group_Button.disabled = true;
        Chosen_Student_Button.disabled = true;
        Chosen_Student_From_Group_Button.disabled = true;
        clearInterval(Chosen_Medium_Group_t);
        Chosen_Medium_Group_t = setInterval(function () {
            Random_Math = Math.round(Math.random() * (Vertical_Group.length - 1));
            Name.innerHTML = "第" + Number(Random_Math + 1) + "大组";
            Group.innerHTML = "第" + Number(Random_Math + 1) + "大组";
            var tmpImage = new Image();
            tmpImage.src = "http://randroca.deginx.com/Pic/Math/number-" + Number(Random_Math + 1) + ".png";
            Avatar.src = tmpImage.src;
            if (Last_Medium_Group != null) {
                document.getElementById(Last_Medium_Group).style.backgroundColor = "";
            }

            document.getElementById('Medium_Group_' + Random_Math).style.backgroundColor = "#AEE1E1";
            Last_Medium_Group = 'Medium_Group_' + Random_Math;
        }, 30);
        Chosen_Medium_Group_Button.innerHTML = "停止";
        Chosen_Medium_Group_Button_State = 1;
    } else {
        Chosen_Medium_Group_Button_State = 0;
        Chosen_Medium_Group_Button.innerHTML = "随机抽取大组";
        clearInterval(Chosen_Medium_Group_t);
        Chosen_Group_Button.disabled = false;
        Chosen_Student_Button.disabled = false;

    }
}