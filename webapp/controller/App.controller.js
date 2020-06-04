sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	
    "use strict";
    return Controller.extend("ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App", {
        onInit: function () {
            console.log("app controller:console werkt.");
           
        /*  //source: https://jsbin.com/dopaziyixe/edit?html,output
            var f = new sap.ui.unified.FileUploader({  
          change : function(e){
            sap.ui.getCore()._file = e.getParameter("files") && e.getParameter("files")[0];
            }
           
            f.placeAt("content");
        });*/
       
        },
       
       
       
 
        getModel: function (sName) {
            return this.getOwnerComponent().getModel(sName);
        },
        onpresschange: function (oEvent) {
            console.log("OnPressChange func started.");
            // let sFilename = oEvent.getParameter("newValue");
            let oFile = oEvent.getParameter("files")[0];
            //this.setup_table(oFile);
            console.log(oFile);
        },
        onLoadFileModel: function (aLines) {
            this.getView().getModel("FileModel").setProperty("/lines", aLines);
        },
       
        setup_table: function (file){
            console.log("setup_table has been loaded!");
            let name = file.name;
            console.log(name);
            let reader = new FileReader();
            let that = this;
            reader.onload = function (e) {
                let bin = e.target.result; // haal resultaat op van file upload
                console.log("Bin: " + bin);
                let array = bin.split("\n"); // split files in een array van objecten
                console.log("Array: " + array);
 
                let aLines = [];
                let aLinesH = [];
                let titleArray = [];
 
                if (name === "SCHEDULE_LINE_DATA.txt") {
                    console.log("Schedule line data detected!");
                    titleArray = ["Material Number", "Batch Input Interface Record Type", "Period indicator (day, week, month, posting period)",
                        "Schedule line date", "Planned quantity batch input", "BOM explosion number", "Production Version",
                        "Offset for generation of test data"
                    ];
 
                    for (let line of array) {
                        // splitst element uit array op tab
                        line = line.split("\t");
                        // line is nu 1 regel uit het bestand, en met elk veld uit die regel vul je een object op
                        let temp = {
                            Matnr: line[0],
                            BatchRt: line[1],
                            PeriodIndicator: line[2],
                            ScheduleLineDate: line[3],
                            PlannedQuantity: line[4],
                            Bom: line[5],
                            ProductionV: line[6],
                            Offset: line[7]
                        };
                        // push dit object lines naar een array 'aLines'
                        aLines.push(temp);
                    }
                    // loop de objecten over array
                    for (let obj of aLines) {
                        let t = {
                            header1: obj.Matnr,
                            header2: obj.BatchRt,
                            header3: obj.PeriodIndicator,
                            header4: obj.ScheduleLineDate,
                            header5: obj.PlannedQuantity,
                            header6: obj.Bom,
                            header7: obj.ProductionV,
                            header8: obj.Offset
                        };
                        aLinesH.push(t);
                    }
                    that.emptyAndFillTable(titleArray, aLinesH);
                } else if (name === "ITEM_DATA.txt") {
                    console.log("Item data detected!");
                    titleArray = ["Batch Input Interface Record Type", "Material Number", "Requirements type",
                        "Version number for independent requirements", "Indicator: version active", "Requirements Plan Number", "Plant",
                        "Name of info structure - characteristic ", "Field name in the generated DDIC structure",
                        "Version number in the information structure", "Account Assignment Category", "Special Stock Indicator",
                        "Consumption Posting", "Work Breakdown Structure Element (WBS Element)", "Item Number in Sales Order", "Sales Order Number",
                        "Reference type Date", "Time", "Valuation of Special Stock", "MRP Area", "With no MRP"
                    ];
 
                    for (let line of array) {
                        // splitst element uit array op tab
                        line = line.split("\t");
                        // line is nu 1 regel uit het bestand, en met elk veld uit die regel vul je een object op
                        let temp = {
                            BatchInputIRT: line[0],
                            MatNr: line[1],
                            ReqType: line[2],
                            VersionNr: line[3],
                            Indicator: line[4],
                            ReqPlanNr: line[5],
                            Plant: line[6],
                            NameInfoStructChar: line[7],
                            FieldNameGenDDICStruct: line[8],
                            VersionNrInfoStruct: line[9],
                            AccAssignmentCat: line[10],
                            SpecialStockIndic: line[11],
                            ConsumpPost: line[12],
                            WorkBrkdwnStructElement: line[13],
                            ItemNrSO: line[14],
                            NrSO: line[15],
                            RefTypeDate: line[16],
                            Time: line[17],
                            ValueSpecStock: line[18],
                            AreaMRP: line[19],
                            WithNoMRP: line[20]
                        };
                        // push dit object lines naar een array 'aLines'
                        aLines.push(temp);
                    }
                    // loop de objecten over array
                    for (let obj of aLines) {
                        let t = {
                            header1: obj.BatchInputIRT,
                            header2: obj.MatNr,
                            header3: obj.ReqType,
                            header4: obj.VersionNr,
                            header5: obj.Indicator,
                            header6: obj.ReqPlanNr,
                            header7: obj.Plant,
                            header8: obj.NameInfoStructChar,
                            header9: obj.FieldNameGenDDICStruct,
                            header10: obj.VersionNrInfoStruct,
                            header11: obj.AccAssignmentCat,
                            header12: obj.SpecialStockIndic,
                            header13: obj.ConsumpPost,
                            header14: obj.WorkBrkdwnStructElement,
                            header15: obj.ItemNrSO,
                            header16: obj.NrSO,
                            header17: obj.RefTypeDate,
                            header18: obj.Time,
                            header19: obj.ValueSpecStock,
                            header20: obj.AreaMRP,
                            header21: obj.WithNoMRP
                        };
                        aLinesH.push(t);
                    }
                    that.emptyAndFillTable(titleArray, aLinesH);
                } else if (name === "SESSION_RECORD.txt") {
                    console.log("Session record data detected!");
                    titleArray = ["Material Number", "Batch Input Interface Record Type", "Delivery/order finish date", "Internal Class Number",
                        "Row Number of letiant Table - External", "Usage Probability in Character Format", "Fixing indicator",
                        "Copying firmed objects allowed", "Indicator = 'X' quantity / indicator = ' ' usage probability"
                    ];
 
                    for (let line of array) {
                        // splitst element uit array op tab
                        line = line.split("\t");
                        // line is nu 1 regel uit het bestand, en met elk veld uit die regel vul je een object op
                        let temp = {
                            Matnr: line[0],
                            BatchRt: line[1],
                            DeliveryOrOrderFinishDate: line[2],
                            InternClassNr: line[3],
                            RowNrLetiantTableEXT: line[4],
                            UsageProbCharFormat: line[5],
                            FixingIndic: line[6],
                            CopyingFirmedObjAllowed: line[7],
                            QuantityIndicUsageProb: line[8]
                        };
                        // push dit object lines naar een array 'aLines'
                        aLines.push(temp);
                    }
                    // loop de objecten over array
                    for (let obj of aLines) {
                        let t = {
                            header1: obj.Matnr,
                            header2: obj.BatchRt,
                            header3: obj.DeliveryOrOrderFinishDate,
                            header4: obj.InternClassNr,
                            header5: obj.RowNrLetiantTableEXT,
                            header6: obj.UsageProbCharFormat,
                            header7: obj.FixingIndic,
                            header8: obj.CopyingFirmedObjAllowed,
                            header9: obj.QuantityIndicUsageProb
                        };
                        aLinesH.push(t);
                    }
                    that.emptyAndFillTable(titleArray, aLinesH);
                }
            };
            reader.readAsText(file);
        },
       
       
        /*uploadComplete functie zou ervoor moeten zorgen dat:
        -file wordt ingelezen
        -gelezen data wordt in de JSON gebracht
        -JSON wordt weergegeven in table
        */
        uploadComplete: function (oEvent) {
            //This code was generated by the layout editor.
            console.log("upload complete function started!");
           
            //file wordt ingelezen
       
            //gelezen file wordt in data.json gebracht
           
            //JSON wordt weergegeven in tabel
           
            console.log("uploadComplete func has ended");
            },
        /**
         *@memberOf ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App
         */
        uploadTerminated: function (oEvent) {
            //This code was generated by the layout editor.
            console.log("upload terminated!");
        },
        /**
         *@memberOf ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App
         */
         
        beforeUploadStarts: function (oEvent,file) {
            //This code was generated by the layout editor.
           
            console.log("Before upload starts function");
            let tekst = file;
            console.log(" before upload tekst: ");
            console.log(tekst);
        },
        /**
         *@memberOf ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App
         */
        selectionChange: function (oEvent) {
            //This code was generated by the layout editor.
            console.log("selectionChange!");
        },
        /**
         *@memberOf ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App
         */
        collectionChange: function (oEvent,file) {
                //This code was generated by the layout editor.
                console.log("collection changed function");
                    let tekst = file;
                console.log(" collectionChange tekst: ");
                console.log(tekst);
            }
            /**
             *@memberOf ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App
             */
            ,
        /**
         *@memberOf ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App
         */
        collectionItemModelContextChange: function (oEvent) {
            //This code was generated by the layout editor.
            console.log("collectionItemModelcontextChange function aangeroepen");
        }
    });
});