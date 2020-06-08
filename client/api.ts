// -------------------------------------------------------------------------- //
//                                   API                                      //
// -------------------------------------------------------------------------- //
//                 A centralized place for all API call definitions

const postAndDownload = (url: string, bodyData: any) => {
  fetch(url, getOptions(bodyData))
    .then((response: any) => response.json())
    .then((json: any) => {
      const base64String = decodeURI(json);
      downloadPDF(base64String, bodyData.file_name);
    });
}

const postAndOpenInNewTab = (url: string, bodyData: any) => {
  fetch(url, getOptions(bodyData))
    .then((response: any) => response.json())
    .then((json: any) => {
      const base64String = decodeURI(json);
      openPDF(base64String);
    });
}

// -------------------------------------------------------------------------- //
//                               Api Helpers                                  //
// -------------------------------------------------------------------------- //
//                     Logic used when making API calls


const getOptions = (bodyData: any) => {
  return {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

function downloadPDF(base64String: string, name: string) {
  const linkSource = `data:application/pdf;base64,${base64String}`;
  const downloadLink = document.createElement("a");
  const fileName = name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

function openPDF(base64String: string) {
  const linkSource = `data:application/pdf;base64,${base64String}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.target = "blank";
  downloadLink.click();
}

// -------------------------------------------------------------------------- //
//                                   Export                                   //
// -------------------------------------------------------------------------- //

export const API = {
  postAndOpenInNewTab,
  postAndDownload
}