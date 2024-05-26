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
    normalizeURL   
}