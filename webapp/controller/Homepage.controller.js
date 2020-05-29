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
		onLoadFileModel: function (aLines) {
			this.getView().getModel("FileModel").setProperty("/lines", aLines);
		},
		emptyAndFillTable: function (titleArray, aLinesH) {
			let aLinesEmpty = [];
			let headerTitles = $(".label");

			// Leegmaken van table
			for (let i1 = 0; i1 < titleArray.length; i1++) {
				headerTitles[i1].innerHTML = "";
			}
			this.getView().getModel("FileModel").setData(aLinesEmpty);
			this.onLoadFileModel(aLinesEmpty);

			// Opvullen van table
			for (let i2 = 0; i2 < titleArray.length; i2++) {
				headerTitles[i2].innerHTML = titleArray[i2];
			}
			this.getView().getModel("FileModel").setData(aLinesH);
			this.onLoadFileModel(aLinesH);
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
						"Reference type	Date", "Time", "Valuation of Special Stock", "MRP Area", "With no MRP"
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
		/*
		 * Generic method that posts data to the service
		 * @public
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
				// let oErrorMessage = JSON.parse(oError
			}
		},
		handleUploadPress: function () {
				let oPostModel = this.getModel("PostModel").getData();
				let oSelectedMaterialsModel = this.getModel("SelectedMaterials").getData();
				let oCustomerInfoModel = this.getModel("CustomerInfoModel").getData();
				let aConvertedItems = [];
				if (name === "SESSION_RECORD.txt") {

					oSelectedMaterialsModel.forEach((material, index) => {
						let oEntry = {
							Zzmaterial: material.key,
							Zzquantity: material.quantity,
							Zzdeldate: this.convertDate(material.date),
							Zzvbeln: "0"
						};
						aConvertedItems.push(oEntry);
					});
					// debugger;
					oPostModel.Zzvbeln = "0";
					oPostModel.Zztitle = oCustomerInfoModel.title;
					oPostModel.Zzname1 = oCustomerInfoModel.Name1;
					oPostModel.Zzstreet = oCustomerInfoModel.Street;

					oPostModel.toItems = aConvertedItems;
					this.getView().setBusy(true);
					this._postData("/SessionRecord", oPostModel).
					then((oData) => {
							if (oData.Zzvbeln !== "") {
								var oDialog = new sap.m.Dialog({
									id: "genericDialog",
									title: "Success",
									type: "Message",
									state: "Success",
									content: new sap.m.Text({
										text: `Sales order ${oData.Zzvbeln} successfully created `
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
								GenericElements.showDialog("Error", "No sales order was created, please verify materials.", "OK", "Error");
								this.getView().setBusy(false);
							}
						})
						.catch((oError) => {
							this._handleError(oError);
							this.getView().setBusy(false);
						});
				} else if (name === "SCHEDULE_LINE_DATA.txt") {
					// hier dupe van vorige 
				} else if (name === "ITEM_DATA.txt") {
					// hier dupe van vorige 
				}
			}
			// onUpload: function (oEvent) {
			// 	var oFileUpload = this.getView().byId("fileUploader");
			// 	var domRef = oFileUpload.getFocusDomRef();
			// 	var file = domRef.files[0];
			// 	var that = this;
			// 	this.fileName = file.name;
			// 	this.fileType = file.type;
			// 	var reader = new FileReader();
			// 	reader.onload = function (e) {
			// 		var vContent = e.currentTarget.result.replace("data:" + file.type + ";base64,", "");
			// 		that.postFileToBackend(workorderId, that.fileName, that.fileType, vContent);
			// 	};
			// 	reader.readAsDataURL(file);
			// }
	});
});