const {crawlPage}=require("./crawl.js");

function main(){
    if(process.argv.length!==3){
        console.log("invalid arguments");
        process.exit(1);
    }
    const baseURL=process.argv[2];
    console.log(`starting crawling page ${baseURL}`);    
    crawlPage(baseURL);
}
main();