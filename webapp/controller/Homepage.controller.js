sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ProjectYPP11BizIT.ProjectYPP11BizIT.controller.Homepage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ProjectYPP11BizIT.ProjectYPP11BizIT.view.Homepage
		 */
		onInit: function () {

		},
		getModel: function (sName) {
			return this.getOwnerComponent().getModel(sName);
		},

		onpresschange: function (oEvent) {
			var sFilename = oEvent.getParameter("newValue");
			var oFile = oEvent.getParameter("files")[0];
			this.setup_table(oFile);
		},

		setup_table: function (file) {
			console.log("setup_table has been loaded!");
			var name = file.name;
			console.log(name);
			var reader = new FileReader();
			var that = this;

			reader.onload = function (e) {
				var bin = e.target.result; // haal resultaat op van file upload
				var array = bin.split("\t"); // split files in een array van objecten
				for (var z = 0; z < array.length; z++) {
					if (array[z] === "" || array[z] === "\t") {
						array.splice(z, 1);
					}
				}
				console.log("Array: " + array);

				var aLines = [];
				var titleArray = [];
				var headerTitles = document.getElementsByClassName("label");
				var headerBox = document.querySelectorAll("td>div>div");
				console.log(headerBox);

				if (name === "SCHEDULE_LINE_DATA.txt") {
					console.log("Schedule line data detected!");
					titleArray = ["Batch Input Interface Record Type", "Material Number", "Requirements type",
						"Version number for independent requirements", "Indicator: version active", "Requirements Plan Number", "Plant",
						"Name of info structure - characteristic values", "Field name in the generated DDIC structure",
						"Version number in the information structure", "Account Assignment Category", "Special Stock Indicator",
						"Consumption Posting", "Work Breakdown Structure Element (WBS Element)", "Item Number in Sales Order", "Sales Order Number",
						"Reference type	Date", "Time", "Valuation of Special Stock", "MRP Area", "With no MRP"
					];
					for (var i1 = 0; i1 < titleArray.length; i1++) {
						headerTitles[i1].innerHTML = titleArray[i1];
						// headerBox[i1].setAttribute("style", "width: 100%!important");
					}
					for (var i2 = 0; i2 < array.length; i2++) {
						var oLineScheduleLine1 = {
							header1: array[i2]
						};
						aLines.push(oLineScheduleLine1);
					}
					that.getView().getModel("FileModel").setData(aLines);
					that.onLoadFileModel(aLines);
				} else if (name === "ITEM_DATA.txt") {
					console.log("Item data detected!");
					titleArray = ["Material Number", "Batch Input Interface Record Type", "Period indicator (day, week, month, posting period)",
						"Schedule line date", "Planned quantity batch input", "BOM explosion number", "Production Version",
						"Offset for generation of test data"
					];
					for (var j1 = 0; j1 < titleArray.length; j1++) {
						headerTitles[j1].innerHTML = titleArray[j1];
						// headerBox[j1].setAttribute("style", "width: 100%!important");
					}
					for (var j2 = 0; j2 < array.length; j2++) {
						var oLineItem = {
							header1: array[j2]
						};
						aLines.push(oLineItem);
					}
					that.getView().getModel("FileModel").setData(aLines);
					that.onLoadFileModel(aLines);
				} else if (name === "SESSION_RECORD.txt") {
					console.log("Session record data detected!");
					titleArray = ["Material Number", "Batch Input Interface Record Type", "Delivery/order finish date", "Internal Class Number",
						"Row Number of Variant Table - External", "Usage Probability in Character Format", "Fixing indicator",
						"Copying firmed objects allowed", "Indicator = 'X' quantity / indicator = ' ' usage probability"
					];
					for (var x1 = 0; x1 < titleArray.length; x1++) {
						headerTitles[x1].innerHTML = titleArray[x1];
						// headerBox[x1].setAttribute("style", "width: 100%!important");
					}
					for (var x2 = 0; x2 < array.length; x2++) {
						var oLineSeshRec = {
							header1: array[x2]
						};
						aLines.push(oLineSeshRec);
					}
					that.getView().getModel("FileModel").setData(aLines);
					//	oLine.setData(array);
					that.onLoadFileModel(aLines);
				}
			};
			reader.readAsText(file);
		},
		// Verwijzen naar onLoadFileModel onder property lines
		onLoadFileModel: function (aLines) {
			this.getView().getModel("FileModel").setProperty("/lines", aLines);
		}

		/*onUploadSelectedButton: function () {
			var oUploadSet = this.byId("UploadSet");

			oUploadSet.getItems().forEach(function (oItem) {
				if (oItem.getListItem().getSelected()) {
					oUploadSet.uploadItem(oItem);
				}
			});
		},

		onDownloadSelectedButton: function () {
			var oUploadSet = this.byId("UploadSet");

			oUploadSet.getItems().forEach(function (oItem) {
				if (oItem.getListItem().getSelected()) {
					oItem.download(true);
				}
			});
		}*/
	});
});