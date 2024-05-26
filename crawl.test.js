const {normalizeURL}=require('./crawl.js');
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
test('normalizeURL Capital',()=>{
    const input="https://FACEBOOK.com/path";
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











































































