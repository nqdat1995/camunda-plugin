const buildRequest = (
  csrftoken,
  jsonbody,
  accept = "application/json",
  contenttype = "application/json"
) => {
  return {
    headers: {
      Accept: accept,
      "Content-Type": contenttype,
      "X-XSRF-TOKEN": csrftoken,
    },
    body: jsonbody,
    method: "POST",
  };
};

const buildGetRequest = (
  csrftoken,
  accept = "application/json",
  contenttype = "application/json"
) => {
  var headers = { "X-XSRF-TOKEN": csrftoken };
  if (accept) headers["Accept"] = accept;
  if (contenttype) headers["Content-Type"] = contenttype;
  headers;
  return {
    headers: headers,
    method: "GET",
  };
};

export const fetchData = async (camundaAPI, request) => {
  const cockpitApi = camundaAPI.cockpitApi;
  const engine = camundaAPI.engine;
  let data = null;

  const url = `${cockpitApi}/plugin/cockpit-plugin/${engine}/mainsearchapplic`;

  await fetch(url, buildRequest(camundaAPI.CSRFToken, request))
    .then(async (res) => {
      data = await res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(data);
  return data;
};

export const startProcessDefinition = async (
  camundaAPI,
  process_name,
  request
) => {
  let response = null;

  const url = `/engine-rest/process-definition/key/${process_name}/start`;

  await fetch(url, buildRequest(camundaAPI.CSRFToken, request))
    .then(async (res) => {
      response = await res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(response);
  return response;
};

export const getTaskList = async (camundaAPI, processInstanceId) => {
  let response = null;

  const url = `/engine-rest/task?`;
  const params = {
    processInstanceId: processInstanceId,
    withoutTenantId: false,
    includeAssignedTasks: false,
    assigned: false,
    unassigned: false,
    withoutDueDate: false,
    withCandidateGroups: false,
    withoutCandidateGroups: false,
    withCandidateUsers: false,
    withoutCandidateUsers: false,
    active: false,
    suspended: false,
    variableNamesIgnoreCase: false,
    variableValuesIgnoreCase: false,
  };
  const urlParams = new URLSearchParams(params).toString();

  await fetch(url + urlParams, buildGetRequest(camundaAPI.CSRFToken))
    .then(async (res) => {
      response = await res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(response);
  return response;
};

export const claimApplication = async (camundaAPI, taskId, request) => {
  let response = true;

  const url = `/engine-rest/task/${taskId}/claim`;

  await fetch(url, buildRequest(camundaAPI.CSRFToken, request))
    .then((res) => {
      response = res.status === 204;
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(response);
  return response;
};

export const getUser = async (camundaAPI) => {
  let response = null;

  const url = `/camunda/api/admin/auth/user/default`;

  await fetch(
    url,
    buildGetRequest(
      camundaAPI.CSRFToken,
      "application/json, text/plain, */*",
      null
    )
  )
    .then(async (res) => {
      response = await res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(response);
  return response;
};

export const taskComplete = async (camundaAPI, taskId, request) => {
  let response = null;

  const url = `/engine-rest/task/${taskId}/complete`;

  await fetch(url, buildRequest(camundaAPI.CSRFToken, request))
    .then(async (res) => {
      response = await res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(response);
  return response;
};
