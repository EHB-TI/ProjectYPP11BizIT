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
			let oFile = oEvent.getParameter("files")[0];
			this.setupTable(oFile);
		},
		onLoadFileModel: function (aLines) {
			this.getView().getModel("FileModel").setProperty("/lines", aLines);
		},
		emptyAndFillTable: function (titleArray, aLinesH) {
			let visModel = this.getView().getModel("visModel");
			let aLinesEmpty = [];
			let headerTitles = $(".label");

			// empty the table headers & table after showing all rows  
			for (let f = 0; f < headerTitles.length; f++) {
				visModel.setProperty("/row" + String(f), true);
			}
			for (let i1 = 0; i1 < titleArray.length; i1++) {
				headerTitles[i1].innerHTML = "";
			}
			this.getView().getModel("FileModel").setData(aLinesEmpty);
			this.onLoadFileModel(aLinesEmpty);
			// fill in table headers
			for (let i2 = 0; i2 < titleArray.length; i2++) {
				headerTitles[i2].innerHTML = titleArray[i2];
			}
			// fill in table with data
			this.getView().getModel("FileModel").setData(aLinesH);
			this.onLoadFileModel(aLinesH);
			// search for empty header span, then hide corresponding parent columns 
			for (let f = 0; f < headerTitles.length; f++) {
				if (headerTitles[f].innerText === "" || headerTitles[f].innerHTML === "") {
					console.log("Empty header #" + f);
					visModel.setProperty("/row" + String(f), false);
				}
			}
		},
		setupTable: function (file) {
			console.log("setupTable has been loaded!");
			let name = file.name;
			window.name = name;
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
						"Reference type", "Date", "Time", "Valuation of Special Stock", "MRP Area", "With no MRP"
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
							RefType: line[16],
							date: line[17],
							Time: line[18],
							ValueSpecStock: line[19],
							AreaMRP: line[20],
							WithNoMRP: line[21]
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
							header17: obj.RefType,
							header18: obj.date,
							header19: obj.Time,
							header20: obj.ValueSpecStock,
							header21: obj.AreaMRP,
							header22: obj.WithNoMRP

						};
						aLinesH.push(t);
					}
					that.emptyAndFillTable(titleArray, aLinesH);
				} else if (name === "CHARACTERISTIC_DATA.txt") {
					console.log("Characteristic data detected!");
					titleArray = ["Material Number", "Batch Input Interface Record Type", "Delivery/order finish date", "Internal Class Number",
						"Row Number of Variant Table - External", "Usage Probability in Character Format", "Fixing indicator",
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
							RowNrVariantTableEXT: line[4],
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
							header5: obj.RowNrVariantTableEXT,
							header6: obj.UsageProbCharFormat,
							header7: obj.FixingIndic,
							header8: obj.CopyingFirmedObjAllowed,
							header9: obj.QuantityIndicUsageProb
						};
						aLinesH.push(t);
					}
					that.emptyAndFillTable(titleArray, aLinesH);
				} else if (name === "SESSION_RECORD.txt") {
					console.log("Session record detected!");
					titleArray = ["Batch Input Interface Record Type", "Group name: Batch input session name", "Client",
						"Queue user ID / for historical reasons", "Queue start date",
						"Indicator: Keep Batch Input Session After Processing ?", "No Batch Input Exists for this Field"
					];

					for (let line of array) {
						// splitst element uit array op tab
						line = line.split("\t");
						// line is nu 1 regel uit het bestand, en met elk veld uit die regel vul je een object op
						let temp = {
							STYPE: line[0],
							GROUP: line[1],
							MANDT: line[2],
							USNAM: line[3],
							START: line[4],
							XKEEP: line[5],
							NODATA: line[6]
						};
						// push dit object lines naar een array 'aLines'
						aLines.push(temp);
					}
					// loop de objecten over array
					for (let obj of aLines) {
						let t = {
							header1: obj.STYPE,
							header2: obj.GROUP,
							header3: obj.MANDT,
							header4: obj.USNAM,
							header5: obj.START,
							header6: obj.XKEEP,
							header7: obj.NODATA
						};
						aLinesH.push(t);
					}
					that.emptyAndFillTable(titleArray, aLinesH);
				}
			};
			reader.readAsText(file);
		},
		/*
		 * @param {that} the view
		 * @param {serviceExtend} the path to the specific entitie set
		 * @param {oPayload} the payload that needs to be POSTed
		 * @return {promise} returns the promise with either the data or an errormessage
		 */
		_postData: function (sUrl, oPayload) {
			let oModel = this.getModel();
			return new Promise((resolve, reject) => {
				oModel.create(sUrl, oPayload, {
					success: function (oData) {
						resolve(oData);
						// debugger;
					},
					error: function (oError) {
						reject(oError);
						// debugger;
					}
				});
			});
		},
		_handleError: function (oError) {
			if (typeof oError === "object") {
				console.log("An object has caused an error!");
			} else {
				console.log("An error has occured!");
			}
		},
		handleUploadPress: function () {
			// let oSelectedLinesModel = this.getModel("SelectedLines").getData();
			let oPostModel = this.getModel("PostModel").getData();
			let oRecordModel = this.getModel("RecordModel").getData();
			let aConvertedItems = [];

			if (window.name === "CHARACTERISTIC_DATA.txt") {
				console.log("[" + window.name + "] CHARACTERISTIC_DATA pushing to backend...");
				aConvertedItems.push(oRecordModel);

				oPostModel.Matnr = oRecordModel.Matnr;
				oPostModel.BatchRt = oRecordModel.BatchRt;
				oPostModel.DeliveryOrOrderFinishDate = oRecordModel.DeliveryOrOrderFinishDate;
				oPostModel.InternClassNr = oRecordModel.InternClassNr;
				oPostModel.RowNrVariantTableEXT = oRecordModel.RowNrVariantTableEXT;
				oPostModel.UsageProbCharFormat = oRecordModel.UsageProbCharFormat;
				oPostModel.FixingIndic = oRecordModel.FixingIndic;
				oPostModel.CopyingFirmedObjAllowed = oRecordModel.CopyingFirmedObjAllowed;
				oPostModel.QuantityIndicUsageProb = oRecordModel.QuantityIndicUsageProb;
				debugger;
				oPostModel.toItems = aConvertedItems;
				this.getView().setBusy(true);
				this._postData("/Characteristic_datas", oPostModel).
				then((oData) => {
						if (oData.Matnr !== "") {
							var oDialog = new sap.m.Dialog({
								id: "genericDialog",
								title: "Success",
								type: "Message",
								state: "Success",
								content: new sap.m.Text({
									text: `Characteristic data with material number #${oData.Matnr} successfully created in back-end`
								}),
								endButton: new sap.m.Button({
									text: "OK",
									press: () => {
										oDialog.close();
										this.clearModel();
									}
								}),
								afterClose: function () {
									oDialog.destroy();
								}
							});
							oDialog.open();
							this.getView().setBusy(false);
						} else {
							console.log("[Error] Er werd geen data naar de back-end doorgestuurd, probeer opnieuw.");
							this.getView().setBusy(false);
						}
					})
					.catch((oError) => {
						this._handleError(oError);
						this.getView().setBusy(false);
					});
			} else if (window.name === "SCHEDULE_LINE_DATA.txt") {
				console.log("[" + window.name + "] SCHEDULE_LINE_DATA pushing to backend...");
				aConvertedItems.push(oRecordModel);

				oPostModel.Matnr = oRecordModel.Matnr;
				oPostModel.BatchRt = oRecordModel.BatchRt;
				oPostModel.PeriodIndicator = oRecordModel.PeriodIndicator;
				oPostModel.ScheduleLineDate = oRecordModel.ScheduleLineDate;
				oPostModel.PlannedQuantity = oRecordModel.PlannedQuantity;
				oPostModel.Bom = oRecordModel.Bom;
				oPostModel.ProductionV = oRecordModel.ProductionV;
				oPostModel.Offset = oRecordModel.Offset;
				debugger;
				oPostModel.toItems = aConvertedItems;
				this.getView().setBusy(true);
				this._postData("/Scheduleline_datas", oPostModel).
				then((oData) => {
						if (oData.Matnr !== "") {
							var oDialog = new sap.m.Dialog({
								id: "genericDialog",
								title: "Success",
								type: "Message",
								state: "Success",
								content: new sap.m.Text({
									text: `Schedule line data with material number #${oData.Matnr} successfully created in back-end`
								}),
								endButton: new sap.m.Button({
									text: "OK",
									press: () => {
										oDialog.close();
										this.clearModel();
									}
								}),
								afterClose: function () {
									oDialog.destroy();
								}
							});
							oDialog.open();
							this.getView().setBusy(false);
						} else {
							console.log("[Error] Er werd geen data naar de back-end doorgestuurd, probeer opnieuw.");
							this.getView().setBusy(false);
						}
					})
					.catch((oError) => {
						this._handleError(oError);
						this.getView().setBusy(false);
					});
			} else if (window.name === "ITEM_DATA.txt") {
				aConvertedItems.push(oRecordModel);

				oPostModel.BatchInputIRT = oRecordModel.BatchInputIRT;
				oPostModel.MatNr = oRecordModel.MatNr;
				oPostModel.ReqType = oRecordModel.ReqType;
				oPostModel.VersionNr = oRecordModel.VersionNr;
				oPostModel.Indicator = oRecordModel.Indicator;
				oPostModel.ReqPlanNr = oRecordModel.ReqPlanNr;
				oPostModel.Plant = oRecordModel.Plant;
				oPostModel.NameInfoStructChar = oRecordModel.NameInfoStructChar;
				oPostModel.FieldNameGenDDICStruct = oRecordModel.FieldNameGenDDICStruct;
				oPostModel.VersionNrInfoStruct = oRecordModel.VersionNrInfoStruct;
				oPostModel.AccAssignmentCat = oRecordModel.AccAssignmentCat;
				oPostModel.SpecialStockIndic = oRecordModel.SpecialStockIndic;
				oPostModel.ConsumpPost = oRecordModel.ConsumpPost;
				oPostModel.WorkBrkdwnStructElement = oRecordModel.WorkBrkdwnStructElement;
				oPostModel.ItemNrSO = oRecordModel.ItemNrSO;
				oPostModel.NrSO = oRecordModel.NrSO;
				oPostModel.RefType = oRecordModel.RefType;
				oPostModel.date = oRecordModel.date;
				oPostModel.Time = oRecordModel.Time;
				oPostModel.ValueSpecStock = oRecordModel.ValueSpecStock;
				oPostModel.AreaMRP = oRecordModel.AreaMRP;
				oPostModel.WithNoMRP = oRecordModel.WithNoMRP;
				debugger;
				oPostModel.toItems = aConvertedItems;
				this.getView().setBusy(true);
				this._postData("/Item_datas", oPostModel).
				then((oData) => {
						if (oData.Matnr !== "") {
							var oDialog = new sap.m.Dialog({
								id: "genericDialog",
								title: "Success",
								type: "Message",
								state: "Success",
								content: new sap.m.Text({
									text: `Item data with material number #${oData.Matnr} successfully created in back-end`
								}),
								endButton: new sap.m.Button({
									text: "OK",
									press: () => {
										oDialog.close();
										this.clearModel();
									}
								}),
								afterClose: function () {
									oDialog.destroy();
								}
							});
							oDialog.open();
							this.getView().setBusy(false);
						} else {
							console.log("[Error] Er werd geen data naar de back-end doorgestuurd, probeer opnieuw.");
							this.getView().setBusy(false);
						}
					})
					.catch((oError) => {
						this._handleError(oError);
						this.getView().setBusy(false);
					});
			} else if (window.name === "SESSION_RECORD.txt") {
				console.log("[" + window.name + "] SESSION_RECORD pushing to backend...");
				aConvertedItems.push(oRecordModel);

				oPostModel.STYPE = oRecordModel.STYPE;
				oPostModel.GROUP = oRecordModel.GROUP;
				oPostModel.MANDT = oRecordModel.MANDT;
				oPostModel.USNAM = oRecordModel.USNAM;
				oPostModel.START = oRecordModel.START;
				oPostModel.XKEEP = oRecordModel.XKEEP;
				oPostModel.NODATA = oRecordModel.NODATA;
				debugger;
				oPostModel.toItems = aConvertedItems;
				this.getView().setBusy(true);
				this._postData("/Session_records", oPostModel).
				then((oData) => {
						if (oData.STYPE !== "") {
							var oDialog = new sap.m.Dialog({
								id: "genericDialog",
								title: "Success",
								type: "Message",
								state: "Success",
								content: new sap.m.Text({
									text: "Session record data successfully created in back-end"
								}),
								endButton: new sap.m.Button({
									text: "OK",
									press: () => {
										oDialog.close();
										this.clearModel();
									}
								}),
								afterClose: function () {
									oDialog.destroy();
								}
							});
							oDialog.open();
							this.getView().setBusy(false);
						} else {
							console.log("[Error] Er werd geen data naar de back-end doorgestuurd, probeer opnieuw.");
							this.getView().setBusy(false);
						}
					})
					.catch((oError) => {
						this._handleError(oError);
						this.getView().setBusy(false);
					});

			}
		}
	});
});