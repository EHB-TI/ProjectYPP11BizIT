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
				debugger;
				var bin = e.target.result; // haal resultaat op van file upload
				var array = bin.split("\t"); // split files in een array van objecten
				/* Veranderd array van strings in array van objecten
				array = array.map(value => ({
					value
				}));*/
				// Array van objecten -> FileModel steken
				console.log("Array: " + array);

				var aLines = [];

				if (name === "SCHEDULE_LINE_DATA.txt") {
					console.log("Schedule line data detected!");
					for (var objSL in array) {
						var oLineScheduleLine1 = {
							header1: objSL //.TEST
						};
						aLines.push(oLineScheduleLine1);
					}
					that.getView().getModel("FileModel").setData(aLines);
					that.onLoadFileModel(aLines);
				} else if (name === "ITEM_DATA.txt") {
					console.log("Item data detected!");
					for (var objI in array) {
						var oLineItem = {
							header1: objI //.TEST
						};
						aLines.push(oLineItem);
					}
					that.getView().getModel("FileModel").setData(aLines);
					that.onLoadFileModel(aLines);
				} else if (name === "SESSION_RECORD.txt") {
					console.log("Session record data detected!");
					for (var objS in array) {
						var oLineSeshRec = {
							header1: objS //.TEST
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