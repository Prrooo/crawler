const {JSDOM}=require("jsdom");

async function crawlPage(baseURL){
    console.log(`active crawling ${baseURL}`);
    try {
       const resp=await fetch(baseURL);
//       console.log(await resp.headers); 
        const contentType=resp.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log(`non html response : ${contentType} on page : ${baseURL}`);
            return ;
        }
        console.log(await resp.text());
    } catch (error) {
        console.log(`error in fetch : ${error.message} on pgae : ${baseURL}`);
    }
}

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
    crawlPage
}