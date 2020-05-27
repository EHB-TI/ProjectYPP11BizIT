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
			// let sFilename = oEvent.getParameter("newValue");
			let oFile = oEvent.getParameter("files")[0];
			this.setup_table(oFile);
		},
		setup_table: function (file) {
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
				let titleArray = [];
				let headerTitles = document.getElementsByClassName("label");
				// let headerBox = document.querySelectorAll("td>div>div");

				if (name === "SCHEDULE_LINE_DATA.txt") {
					console.log("Schedule line data detected!");
					titleArray = ["Material Number", "Batch Input Interface Record Type", "Period indicator (day, week, month, posting period)",
						"Schedule line date", "Planned quantity batch input", "BOM explosion number", "Production Version",
						"Offset for generation of test data"
					];
					for (let i1 = 0; i1 < titleArray.length; i1++) {
						headerTitles[i1].innerHTML = titleArray[i1];
						// headerBox[i1].setAttribute("style", "width: 100%!important");
					}
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
						// push dit object met de waarden van 'line' in een andere array 'aLines'
						aLines.push(temp);
					}

					// loop de objecten over array
					for (let obj of aLines) {
						console.log(obj);
					}

					that.getView().getModel("FileModel").setData(aLines);
					that.onLoadFileModel(aLines);

				} else if (name === "ITEM_DATA.txt") {
					console.log("Item data detected!");
					titleArray = ["Batch Input Interface Record Type", "Material Number", "Requirements type",
						"Version number for independent requirements", "Indicator: version active", "Requirements Plan Number", "Plant",
						"Name of info structure - characteristic ", "Field name in the generated DDIC structure",
						"Version number in the information structure", "Account Assignment Category", "Special Stock Indicator",
						"Consumption Posting", "Work Breakdown Structure Element (WBS Element)", "Item Number in Sales Order", "Sales Order Number",
						"Reference type	Date", "Time", "Valuation of Special Stock", "MRP Area", "With no MRP"
					];
					that.getView().getModel("FileModel").setData(aLines);
					that.onLoadFileModel(aLines);
				} else
				if (name === "SESSION_RECORD.txt") {
					console.log("Session record data detected!");
					titleArray = ["Material Number", "Batch Input Interface Record Type", "Delivery/order finish date", "Internal Class Number",
						"Row Number of letiant Table - External", "Usage Probability in Character Format", "Fixing indicator",
						"Copying firmed objects allowed", "Indicator = 'X' quantity / indicator = ' ' usage probability"
					];
					that.getView().getModel("FileModel").setData(aLines);
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
			let oUploadSet = this.byId("UploadSet");

			oUploadSet.getItems().forEach(function (oItem) {
				if (oItem.getListItem().getSelected()) {
					oUploadSet.uploadItem(oItem);
				}
			});
		},

		onDownloadSelectedButton: function () {
			let oUploadSet = this.byId("UploadSet");

			oUploadSet.getItems().forEach(function (oItem) {
				if (oItem.getListItem().getSelected()) {
					oItem.download(true);
				}
			});
		}*/
	});
});