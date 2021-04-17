const ReconnectingWebSocket = require('reconnecting-websocket');
var Prepare_Chosen_Student = [];
const options = {
    maxReconnectionDelay: 0
};
var ws = new ReconnectingWebSocket("wss://www.deginx.com/websocket", ["randroca_16", "f5c69c4c-e79e-4f4b-b4d3-b4e2435be9e6", "HWPVQK1Ag3NAGupMWoHXHDft"], options);
//申请一个WebSocket对象，参数是服务端地址，同http协议使用http://开头一样，WebSocket协议的url使用ws://开头，另外安全的WebSocket协议使用wss://开头
ws.onopen = function() {
    //当WebSocket创建成功时，触发onopen事件
    ws.send('{ "action": "none"}'); //将消息发送到服务端
}

ws.onmessage = function(e) {
    //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
    response = JSON.parse(e.data)
    if ("content" in response) {
        actions = JSON.parse(Buffer(response.content, 'base64').toString())
        switch (actions.action) {
            case "chosen":
                Clear_Color();
                Card_Info_Change(actions.chosen_name);
                document.getElementById(Student_Info.Info[actions.chosen_name].Coordinate).style.backgroundColor = "#AEE1E1";
                document.getElementById(Student_Info.Info[actions.chosen_name].Coordinate).style.color = "#fff";
                Last_ID = Student_Info.Info[actions.chosen_name].Coordinate;
                break;
            case "prepare_chosen":
                Prepare_Chosen_Student = actions.chosen_name;
                break;
            case "Chosen_Student_Button":
                Chosen_Student();
                break;
            case "Chosen_Group_Button":
                Chosen_Group();
                break;
            case "Chosen_Student_From_Grou_Button":
                Chosen_Student_From_Group();
                break;
        }
    }
}
ws.onerror = function(e) {
    //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
    alert(error);
}