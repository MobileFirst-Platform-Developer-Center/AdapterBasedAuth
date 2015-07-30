/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var AuthRealmChallengeHandler = WL.Client.createChallengeHandler("AuthRealm");

AuthRealmChallengeHandler.isCustomResponse = function(response) {
	if (!response || !response.responseJSON	|| response.responseText === null) {
		return false;
	}
	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
		return true;
	} else {
		return false;
	}
};

AuthRealmChallengeHandler.handleChallenge = function(response){
	var authRequired = response.responseJSON.authRequired;

	if (authRequired == true){
		$("#AppDiv").hide();
		$("#AuthDiv").show();
		$("#AuthPassword").empty();
		$("#AuthInfo").empty();

		if (response.responseJSON.errorMessage)
	    	$("#AuthInfo").html(response.responseJSON.errorMessage);
		
	} else if (authRequired == false){
		$("#AppDiv").show();
		$("#AuthDiv").hide();
		AuthRealmChallengeHandler.submitSuccess();
	}
};


$("#AuthSubmitButton").bind('click', function () {
	var username = $("#AuthUsername").val();
	var password = $("#AuthPassword").val();

	var invocationData = {
		adapter : "AuthAdapter",
		procedure : "submitAuthentication",
		parameters : [ username, password ]
	};

	AuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
});

$("#AuthCancelButton").bind('click', function () {
	$("#AppDiv").show();
	$("#AuthDiv").hide();
	AuthRealmChallengeHandler.submitFailure();
});
