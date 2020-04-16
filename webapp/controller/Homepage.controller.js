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

		onpresschange: function (oEvent) {
			var sFilename = oEvent.getParameter("newValue");
			var oFile = oEvent.getParameter("files")[0];
			this.setup_table(oFile);
		},

		setup_table: function (file) {
			var name = file.name;
			var reader = new FileReader();
			var that = this;

			reader.onload = function (e) {
				var bin = e.target.result; // haal resultaat op van file upload
				var array = bin.split("\t"); // split files in een array van objecten

				/* Veranderd array van strings in array van objecten
				array = array.map(value => ({
					value
				}));*/

				// Array van objecten -> FileModel steken
				var oLine = new sap.ui.model.json.JSONModel();
				oLine.setData(array);
				sap.ui.getCore().setModel(oLine);

				var oData = new sap.m.Select({ // Hier gaat het mis !
					items: {
						path: '/oData',
						sorter: {
							path: '0'
						}
					}
				});

				// 	debugger;

				var aLines = [];
				//var oLine = {
				//	header1: "test"
				//};
				for (var object in oData) {
					aLines.push(object);
				}
				that.onLoadFileModel(aLines);
			};
			reader.readAsBinaryString(file);
		},

		// Verwijzen naar onLoadFileModel onder property lines
		onLoadFileModel: function (aLines) {
			this.getView().getModel("FileModel").setProperty("/lines", aLines);
		},

		onUploadSelectedButton: function () {
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
		}
	});
});