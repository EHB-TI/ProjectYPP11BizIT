/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ProjectYPP11BizIT/ProjectYPP11BizIT/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});