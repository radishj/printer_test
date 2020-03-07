const start = async function(a, b) {
    const ThermalPrinter = require("node-thermal-printer").printer;
    const PrinterTypes = require("node-thermal-printer").types;

    let printer = new ThermalPrinter({
    type: PrinterTypes.STAR,
    interface: 'tcp://192.168.0.30'
    });
    printer.setCharacterSet('CHINA');
    printer.drawLine();                                         // Draws a line
    printer.alignCenter();
    printer.underline(true); 
    
    printer.println("Hello world");
    printer.underline(false); 
    printer.println("Hello world 123");
    //printer.setTextSize(0.5,0.5);
    //printer.pdf417("412656512900");
    //printer.printQR("https://olaii.com");
  
    //printer.newLine();

    //printer.printBarcode("412657080719");

    /*printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"baicai", align:"LEFT", width:0.5, bold:true },
        { text:"$0.89", align:"RIGHT", cols:8 }
      ]);
    printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"qiezi", align:"LEFT", width:0.5, bold:true },
        { text:"$0.89", align:"RIGHT", cols:8 }
      ]);
    printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"doufu", align:"LEFT", width:0.5, bold:true },
        { text:"$0.89", align:"RIGHT", cols:8 }
      ]);
    printer.drawLine(); */
    printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"doufu", align:"LEFT", width:0.4, bold:true },
        { text:"$0.89", align:"RIGHT", width:0.4}
      ]);
      printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"qiezi", align:"LEFT", width:0.4, bold:true },
        { text:"$1.25", align:"RIGHT", width:0.4 }
      ]);
      printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"白菜", align:"LEFT", width:0.4, bold:true },
        { text:"$2.49", align:"RIGHT", width:0.4 }
      ]);
      printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"西瓜", align:"LEFT", width:0.4, bold:true },
        { text:"$6.66", align:"RIGHT", width:0.4 }
      ]);/*
     printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"doufu3", align:"LEFT", width:0.4, bold:true },
        { text:"$0.89", align:"RIGHT", cols:10 }
      ]);
     printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"doufu4", align:"LEFT", width:1.2, bold:true },
        { text:"$0.89", align:"RIGHT", cols:15 }
      ]);
      printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"doufu5", align:"LEFT", width:2, bold:true },
        { text:"$0.89", align:"RIGHT", cols:25 }
      ]);
      printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
        { text:"doufu6", align:"LEFT", width:2.5, bold:true },
        { text:"$0.89", align:"RIGHT", cols:1 }
      ]);
    printer.tableCustom([                                       
        { text:"茄子", align:"LEFT", width:0.5, bold:true },
        { text:"$1.25", align:"RIGHT", cols:8 }
      ]);*/

    printer.drawLine();                                         // Draws a line
    await printer.printImage('./assets/tasti.png');
    printer.cut();
    printer.beep();  

    try {
    let execute = printer.execute()
    console.error("Print done!");
    } catch (error) {
    console.log("Print failed:", error);
    }
}

//start();
let printer = require('./examples/example');
printer.print();