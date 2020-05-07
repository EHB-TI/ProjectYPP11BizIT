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
				var valid = bin.split("\t"); // split files in een array van objecten
				// for each?
				// var valid = valid1.split("\r\n")
				console.log("Dirty values cleaned from array!");
				console.log("Validated array: " + valid);

				var aLines = [];
				var titleArray = [];
				var headerTitles = document.getElementsByClassName("label");
				var headerBox = document.querySelectorAll("td>div>div");

				if (name === "SCHEDULE_LINE_DATA.txt") {
					console.log("Schedule line data detected!");
					titleArray = ["Material Number", "Batch Input Interface Record Type", "Period indicator (day, week, month, posting period)",
						"Schedule line date", "Planned quantity batch input", "BOM explosion number", "Production Version",
						"Offset for generation of test data"
					];
					for (var i1 = 0; i1 < titleArray.length; i1++) {
						headerTitles[i1].innerHTML = titleArray[i1];
						// headerBox[i1].setAttribute("style", "width: 100%!important");
					}

					var oLineFirst = {
						header1: valid[0],
						header2: valid[1],
						header3: valid[2],
						header4: valid[3],
						header5: valid[4],
						header6: "",
						header7: "",
						header8: "0"
					};
					console.log("Clean headers in object oLineFirst: " + oLineFirst);
					aLines.push(oLineFirst);

					var counter = 7;
					do {
						var oLine = {
							header1: valid[counter],
							header2: valid[counter + 1],
							header3: valid[counter + 2],
							header4: valid[counter + 3],
							header5: valid[counter + 4],
							header6: valid[counter + 5],
							header7: valid[counter + 6],
							header8: valid[counter + 7]
						};
						console.log("[#] Current loop iteration: " + counter / 7);
						counter = counter + 7;
						aLines.push(oLine);
					} while (valid.length > counter);

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
						"Row Number of Variant Table - External", "Usage Probability in Character Format", "Fixing indicator",
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