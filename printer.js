const ThermalPrinter = require("../node-thermal-printer").printer;
const Types = require("../node-thermal-printer").types;

function sendCommand(printer, command){
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
async function print (data) {
  var newTime = new Date().toTimeString();
  if(time == newTime)
  {
    console.log("Duplicate print reclined.");
    return;
  }
  else
  {
    time = newTime;
    console.log("Printing... Time:", time);
  }
  let printer = new ThermalPrinter({
    type: Types.EPSON,  // 'star' or 'epson'
    interface: 'tcp://192.168.0.30',
    options: {
      timeout: 1000
    },
    width: 48,                         // Number of characters in one line - default: 48
    characterSet: 'PC437_USA',          // Character set - default: SLOVENIA
    removeSpecialCharacters: false,    // Removes special characters - default: false
    lineCharacter: "-",                // Use custom character for drawing lines - default: -
  });

  let isConnected = await printer.isPrinterConnected();
  console.log("Printer connected:", isConnected);

  //printer.alignCenter();
  //await printer.printImage('../assets/olaii-logo-black-small.png');
  line = 0;
  data.forEach(command => {
    //console.log(JSON.stringify(command));
    var res = sendCommand(printer,command);
    if(!res.result)
    {
        console.log('line:'+line+'; '+res.msg);
    }
    line++;
  });
  printer.cut();
  //printer.openCashDrawer();

  try {
    await printer.execute();
    console.log("Print success.");
  } catch (error) {
    console.error("Print error:", error);
  }
}


module.exports.print = print;
