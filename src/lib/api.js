import {type} from "@testing-library/user-event/dist/type";

const APIBaseURL = "http://admin.matm-artwork.co.uk/api.php";

const getWebsites = async () => {
    return sendGet('websites');
}

const getWebsite = async (website) => {
    console.log(website);
    return sendGet('website', {dir: website});
}

const doCommand = async (command = '', data = {}) => {
    data.command = command;
    const resp = await sendGet('doCommand', data);
    return resp.id;
}

const getCommandOutput = async (id) => {
    return sendGet('getCommandOutput', {"id": id});
}

const sendGet = async (action, data = {}) => {
    const URL = APIBaseURL + "?action=" + action + "&" + serialize(data);
    return fetch(URL)
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            }
        );
}

const serialize = function(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            if(typeof obj[p] == "string" || typeof obj[p] == "boolean") {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            } else {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])));
            }
        }
    return str.join("&");
}

export {getWebsites, getWebsite, doCommand, getCommandOutput}