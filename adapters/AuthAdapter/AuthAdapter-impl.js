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

function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;
	
	return {
		authRequired: true,
		errorMessage: errorMessage
	};
}

function submitAuthentication(username, password){
	if (username==="user" && password === "password"){

		var userIdentity = {
				userId: username,
				displayName: username, 
				attributes: {
					foo: "bar"
				}
		};

		WL.Server.setActiveUser("AuthRealm", userIdentity);
		
		return { 
			authRequired: false 
		};
	}

	return onAuthRequired(null, "Invalid login credentials");
}

function getSecretData(){
	return {
		secretData: "Very very very very secret data"
	};
}

function onLogout(){
	WL.Logger.debug("Logged out");
}

