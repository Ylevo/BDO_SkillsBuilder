var JSONHelper = {
    _error: function (request, response) {
        if (typeof(response) == "string")
            response = { "status": "Error", "message": response };
        if (request.onError != null) request.onError(this, { request: request, response: response });
    }
    , _exception: function (request, response) {
        if (typeof(response) == "string")
            response = { "status": "Error", "message": response };
        else if (request.onException != null) request.onException(this, { request: request, response: response });
        else if (request.onError != null) request.onError(this, { request: request, response: response });
    }
    , _exec: function (url, method, request) {
        if (request.async === undefined)
            request.async = true;
        var response;
        var xhr = $.ajax({
            url: url
            , async: request.async
            , type: method
            , data: request.data
            , success: function (data) {
                response = JSON.parse(data);
                if (response.status == "Success") {
                    if (request.onSuccess != null) request.onSuccess(this, { request: request, response: response });
                } else if (response.status == "Error") {
                    if (request.onError !== null) request.onError(this, { request: request, response: response });
                } else if (response.status == "Exception") {
                    alert(response.message);
                    if (request.onException != null) request.onException(this, { request: request, response: response });
                    else if (request.onError != null) request.onError(this, { request: request, response: response });
                    
                } else alert("> Statut inconnu : '" + response.status + "'");
            }
        }).complete(function (xhr, status) {
            if (request.complete) request.complete(this, { request: request, response: response });
        }).error(function (xhr, status, error) {
            if (error && status != "abort"
                || (status == "Error" && error == 1)) alert(">" + status + ": " + error);
        });
        return xhr;
    }
};

var Requests = {
    "getClassSkills": function (request) {
        JSONHelper._exec("scripts/s_getClassSkills.php", "POST", request);
    }
    , "insertNewSkillLine": function (request) {
        JSONHelper._exec("scripts/s_insertNewSkillLine.php", "POST", request);
    },
    "getClassSkillsLines": function (request) {
        JSONHelper._exec("scripts/s_getClassSkillsLines.php", "POST", request);
    },
    "getIcons": function (request) {
        JSONHelper._exec("scripts/s_getIcons.php", "POST", request);
    },
    "getClassWebm": function (request) {
        JSONHelper._exec("scripts/s_getClassWebm.php", "POST", request);
    },
    "getClasses": function (request) {
        JSONHelper._exec("scripts/s_getClasses.php", "POST", request);
    },
    "getSkillsGroups": function (request) {
        JSONHelper._exec("scripts/s_getSkillsGroups.php", "POST", request);
    },
    "createSkillsGroup": function (request) {
        JSONHelper._exec("scripts/s_createSkillsGroup.php", "POST", request);
    },
    "createSkill": function (request) {
        JSONHelper._exec("scripts/s_createSkill.php", "POST", request);
    },
    "updateSkill": function (request) {
        JSONHelper._exec("scripts/s_updateSkill.php", "POST", request);
    },
    "removeSkill": function (request) {
        JSONHelper._exec("scripts/s_removeSkill.php", "POST", request);
    }
};