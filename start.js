const puppeteer = require("puppeteer");

// puppeteer.executablePath()는 설치한 puppeteer 노드모듈의 번들로 제공되는 chromium 브라우저의 경로의 주소값을 가진다.
// 해당 예제는 puppeteer.launch를 통해 퍼펫티어를 실행할때 해당 경로의 값을 지정한다.
console.log(puppeteer.executablePath());
/* 테스트 데이타
const userId = "20172465";
const userPw = "tkdrms2tlqkf?!";

let enroll = {
    "927287" : "01",
    "001411" : "09",
    "561103" : "02"
}
*/
const startMacro = (enroll, userId, userPw) =>{
  // 딜레이를 주기 위한 함수
  function delay( timeout ) {
    return new Promise(( resolve ) => {
      setTimeout( resolve, timeout );
    });
  }
  
  puppeteer.launch({
           headless : true	// 헤드리스모드의 사용여부를 묻는다
    , devtools : false	// 브라우저의 개발자 모드의 오픈 여부를 묻는다
    , executablePath : puppeteer.executablePath()	// 실행할 chromium 기반의 브라우저의 실행 경로를 지정한다.
    , ignoreDefaultArgs : false	// 배열이 주어진 경우 지정된 기본 인수를 필터링한다.(중요 : true사용금지)
    , timeout : 3000	// 브라우저 인스턴스가 시작될 때까지 대기하는 시간(밀리 초)
    , defaultViewport : { width : 1500, height : 800 }	// 실행될 브라우저의 화면 크기를 지정한다.
      , args : [ "about:blank",'--no-sandbox', '--disable-setuid-sandbox']
  }).then(async browser => {
    const page = await browser.newPage();
    // 새탭을 열고 작업을 수행할 페이지를 지정한다.
      await page.goto( "http://dreams2.daejin.ac.kr/", { waitUntil : "networkidle2" } );
      
  
      await page.evaluate((id, pw) => {
          document.querySelector('#stdNo').value = id;
          document.querySelector('#passwd').value = pw;
        }, userId, userPw);
      
        await page.click('.btn');
  
        
        await page.goto("http://dreams2.daejin.ac.kr/sugang/nsugang_direct2_new.jsp",
        { waitUntil : "networkidle2" });
  
        page.on('dialog', async dialog => {
          await delay(50);
          await dialog.dismiss();
        });
  
        (async () =>{
          for(let i = 0; i < Object.keys(enroll).length; i++){
            let value = enroll[Object.keys(enroll)[i]];
            console.log(Object.keys(enroll)[i]);
            console.log(value);
            await page.goto("http://dreams2.daejin.ac.kr/sugang/nsugang_direct2_new.jsp",
        { waitUntil : "networkidle2" });
            await page.evaluate((sbjt, clss) => {
              document.querySelector('input[name="getsbjt_no"]').value = sbjt;
              document.querySelector('input[name="getclss_no"]').value = clss;
          },Object.keys(enroll)[i], value);
    
          await delay(50);
          await page.click('a');
          
          }
        })();
        
            
      //await page.close();
      //await browser.close();
  });
}

module.exports.startMacro = startMacro