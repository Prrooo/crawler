const {normalizeURL,getURLsFromHTML}=require('./crawl.js');
const {test,expect}=require('@jest/globals');

test('normalizeURL hostname test',()=>{
    const input="https://facebook.com";
    const actual=normalizeURL(input);
    const expected="facebook.com";
    expect(actual).toEqual(expected);    
})
test('normalizeURL pathname test',()=>{
    const input="https://facebook.com/path";
    const actual=normalizeURL(input);
    const expected="facebook.com/path";
    expect(actual).toEqual(expected);    
})
test('normalizeURL capital',()=>{
    const input="https://facebook.com/path";
    const actual=normalizeURL(input);
    const expected="facebook.com/path";
    expect(actual).toEqual(expected);    
})
test('normalizeURL strip http',()=>{
    const input="http://facebook.com/path";
    const actual=normalizeURL(input);
    const expected="facebook.com/path";
    expect(actual).toEqual(expected);    
})

test('getURLsFromHTML absolute path',()=>{
    const input=`
<html>
    <body>
        <p>working</p>
        <a href="https://facebook.com">click here</a>
    </body>
</html>
    `;
    const baseURLsInput="https://facebook.com";
    const actual=getURLsFromHTML(input,baseURLsInput);
    const expected=["https://facebook.com"];
    expect(actual).toEqual(expected);
})


test('getURLsFromHTML relative path',()=>{
    const input=`
<html>
    <body>
        <p>working</p>
        <a href="/path">click here</a>
    </body>
</html>
    `;
    const baseURLsInput="https://facebook.com";
    const actual=getURLsFromHTML(input,baseURLsInput);
    const expected=["https://facebook.com/path"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative path with /',()=>{
    const input=`
<html>
    <body>
        <p>working</p>
        <a href="/path/">click here</a>
    </body>
</html>
    `;
    const baseURLsInput="https://facebook.com";
    const actual=getURLsFromHTML(input,baseURLsInput);
    const expected=["https://facebook.com/path"];
    expect(actual).toEqual(expected);
})
test('getURLsFromHTML relative path with multiple link',()=>{
    const input=`
<html>
    <body>
        <p>working</p>
        <a href="/path1/">click here</a>
        <a href="/path2/">click here</a>
    </body>
</html>
    `;
    const baseURLsInput="https://facebook.com";
    const actual=getURLsFromHTML(input,baseURLsInput);
    const expected=["https://facebook.com/path1","https://facebook.com/path2"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid URL',()=>{
    const input=`
<html>
    <body>
        <p>working</p>
        <a href="invalid">click here</a>
    </body>
</html>
    `;
    const baseURLsInput="https://facebook.com";
    const actual=getURLsFromHTML(input,baseURLsInput);
    const expected=[];
    expect(actual).toEqual(expected);
})