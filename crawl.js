const {JSDOM}=require("jsdom");

function removeLast(input){
    if(input.slice(-1)==='/'){
        return input.slice(0,-1);
    }
    return input;
}

function getURLsFromHTML(html, baseURL) {
  const urls = []
  const dom = new JSDOM(html)
  const anchors = dom.window.document.querySelectorAll('a');

  for(let anchor of anchors){
    const link=removeLast(anchor.href);
    if(link.slice(0,1)==='/'){
        try {
           const urlObj=new URL(`${baseURL}${link}`);
//           urls.push(urlObj.href); 
           urls.push(`${baseURL}${link}`); 
        } catch (error) {
            console.log(`invalid URL ${error}`);
        }
    }
    else{
        try {
           const urlObj=new URL(`${link}`);
           urls.push(link); 
        } catch (error) {
            console.log(`invalid URL ${error}`);
        }
    }
  }
  return urls
}

function normalizeURL(urlString){
    const objURL=new URL(urlString);
   // console.log(objURL.host,"pathname ",objURL.pathname,"origin ",objURL.origin)
   const hostPath=`${objURL.hostname}${objURL.pathname}`;
   if(hostPath.length > 0 && hostPath.slice(-1)==='/'){
    return hostPath.slice(0,-1);
   }
   return hostPath;
}

module.exports={
    normalizeURL,
    getURLsFromHTML,
}