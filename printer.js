const ThermalPrinter = require("node-thermal-printer").printer;
const Types = require("node-thermal-printer").types;

function sendCommand(printer, command){
    console.log('command:',JSON.stringify(command));
    
    if(!command)
    {
        return {result:false,msg:'Error: command is null'};
    }
    if(!command.type)
    {
        return {result:false,msg:'Error: command.type is null'};
    }
    res={};
    switch (command.type) {
        case 'set font big':
            printer.setTypeFontA();
            res = {result:true};
            break;
        case 'set font small':
            printer.setTypeFontB();
            res = {result:true};
            break;
        case 'align center':
            printer.alignCenter();
            res = {result:true};
            break;
        case 'println':
            if(command.text){
                printer.println(command.text);
                res = {result:true};
            }
            else
            {
                res = {result:false,msg:'Error: println - command.text is null'};
            }
            break;
        case 'draw line':
            printer.drawLine();
            res = {result:true};
            break;
        case 'printlr':
            if(command.left && command.right){
                printer.leftRight(command.left, command.right);
                res = {result:true};
            }
            else
            {
                res = {result:false,msg:'Error: printlr - left or right is null'};
            }
            break;
        case 'c table':
            //console.log(JSON.stringify(command));
            if(command.length){
                if(command.aligns){
                    if(command.widths){
                        if(command.data){
                            for(i=0; i<command.data.length; i++)
                            {
                                data=[];
                                for(j=0; j<command.length; j++)
                                {
                                    data.push({
                                        text:command.data[i][j],
                                        align:command.aligns[j],
                                        width:command.widths[j]
                                    })
                                };
                                //console.log(JSON.stringify(data));
                                printer.tableCustom(data);
                            }
                            //console.log(JSON.stringify(data)+"1111111111111111111111\n");
                            res = {result:true};
                        }
                        else{
                            res = {result:false,msg:'Error: c-table missing data'}; 
                        }
                    }
                    else{
                        res = {result:false,msg:'Error: c-table missing widths'}; 
                    }
                }
                else{
                    res = {result:false,msg:'Error: c-table missing aligns'}; 
                }
            }
            else{
                res = {result:false,msg:'Error: c-table missing length'}; 
            }
            break;
                                                                                                                                                                   
        default:
            res = {result:false, msg:'Error: command type ['+command.type+'] was undefined.'};
    }
    return res;
}
var time = '';
var oldOrderID = '';
async function print (data) {
  var newTime = new Date().toTimeString();
  var newOrderID = data[0].orderID;
  if(oldOrderID == newOrderID)
  {
    console.log("Duplicate print declined. ID:"+newOrderID);
    return;
  }
  else
  {
    time = newTime;
    oldOrderID = newOrderID;
    console.log("Printing... Time:", time,"; ID:",newOrderID,";\n");//,JSON.stringify(data,null,"   "));

  }
  let printer = new ThermalPrinter({
    type: Types.EPSON,  // 'star' or 'epson'
    interface: 'tcp://192.168.192.169',
    options: {
      timeout: 1000
    },
    width: 48,                         // Number of characters in one line - default: 48
    characterSet: 'PC437_USA',          // Character set - default: SLOVENIA
    removeSpecialCharacters: false,    // Removes special characters - default: false
    lineCharacter: "-",                // Use custom character for drawing lines - default: -
  });
  console.log("buffer start length:"+printer.buffer.length);
  let isConnected = await printer.isPrinterConnected();
  console.log("Printer connected:", isConnected);

  //printer.alignCenter();
  //await printer.printImage('../assets/olaii-logo-black-small.png');
  line = 0;
  data.forEach(command => {
    var res={};
    if(line>0){
        //console.log('line:'+line+'; '+JSON.stringify(command));
        res = sendCommand(printer,command);
    }
    if(!res.result)
    {
        console.log('line:'+line+'; '+res.msg);
    }
    line++;
  });
  printer.cut();
  //printer.openCashDrawer();
  console.log('1111111111');
  console.log("buffer type:",typeof printer.buffer);
  console.log("buffer length:"+printer.buffer.length);
  console.log("buffer:"+JSON.stringify(printer.buffer,null,"   "));
  console.log("Print success.");
  var data=[
    27,
    116,
    0,
    27,
    77,
    0,
    27,
    97,
    1,
    66,
    97,
    98,
    97,
    32,
    71,
    104,
    97,
    110,
    110,
    111,
    117,
    106,
    32,
    82,
    101,
    115,
    116,
    97,
    117,
    114,
    97,
    110,
    116,
    32,
    38,
    32,
    67,
    97,
    116,
    101,
    114,
    105,
    110,
    103,
    10,
    27,
    77,
    1,
    53,
    52,
    48,
    48,
    32,
    83,
    32,
    77,
    105,
    97,
    109,
    105,
    32,
    66,
    108,
    118,
    100,
    32,
    85,
    110,
    105,
    116,
    32,
    49,
    51,
    56,
    44,
    32,
    68,
    117,
    114,
    104,
    97,
    109,
    44,
    32,
    78,
    67,
    32,
    50,
    55,
    55,
    48,
    51,
    44,
    32,
    85,
    83,
    10,
    27,
    77,
    0,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    45,
    10,
    27,
    77,
    0,
    32,
    84,
    111,
    116,
    97,
    108,
    32,
    80,
    114,
    105,
    99,
    101,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    36,
    48,
    46,
    48,
    48,
    10,
    67,
    117,
    115,
    116,
    111,
    109,
    101,
    114,
    32,
    78,
    97,
    109,
    101,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    115,
    116,
    101,
    118,
    101,
    110,
    106,
    105,
    97,
    110,
    103,
    10,
    67,
    117,
    115,
    116,
    111,
    109,
    101,
    114,
    32,
    67,
    101,
    108,
    108,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    43,
    49,
    55,
    55,
    56,
    51,
    53,
    48,
    50,
    50,
    48,
    48,
    10,
    79,
    114,
    100,
    101,
    114,
    32,
    73,
    68,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    32,
    122,
    67,
    111,
    52,
    110,
    110,
    108,
    107,
    114,
    53,
    85,
    118,
    108,
    117,
    48,
    52,
    68,
    114,
    51,
    87,
    10,
    27,
    100,
    4,
    27,
    100,
    4,
    29,
    86,
    0,
    27,
    64
 ];
  try {
    BtPrint(data);
    //await printer.execute();
  } catch (error) {
    console.error("Print error:", error);
  }
}

function BtPrint(prn){
    var S = "#Intent;scheme=rawbt;";
    var P =  "package=ru.a402d.rawbtprinter;end;";
    var textEncoded = encodeURI(prn);
    window.location.href="intent:"+textEncoded+S+P;
}
module.exports.print = print;
