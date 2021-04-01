/*Chosen_Class();
const Store = require('electron-store');
let option = {
    name: "config", //文件名称,默认 config
    fileExtension: "json", //文件后缀,默认json
    encryptionKey: "aes-256-cbc", //对配置文件进行加密
    clearInvalidConfig: true, // 发生 SyntaxError  则清空配置,
}
const store = new Store(option);
if (store.get('ClassID') != null) {
    //Avatar_Cache();
    //Print_Table_Of_Seats();
    //Get_Student_Info();
} else*/
Get_Student_Info();
Print_Table_Of_Seats();