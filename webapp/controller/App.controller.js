sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("ProjectYPP11BizIT.ProjectYPP11BizIT.controller.App", {
		onInit: function () {
			console.log("app controller:console werkt.")
			
		/*	//source: https://jsbin.com/dopaziyixe/edit?html,output
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
			console.log("OnPressChange func started.")
			// let sFilename = oEvent.getParameter("newValue");
			let oFile = oEvent.getParameter("files")[0];
			//this.setup_table(oFile);
			console.log(oFile);
		},
		onLoadFileModel: function (aLines) {
			this.getView().getModel("FileModel").setProperty("/lines", aLines);
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


