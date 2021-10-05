// js 코드가 html 문서 어디에있던지 상관없이 실행이 가능하도록
// html 코드에 화면이 다 그려지면 실행해라
// window.load() 와 비슷한 역할
document.addEventListener("DOMContentLoaded", () => {
  const api_text_call = document.querySelector("p.api_text");
  const api_text_res = document.querySelector("span.api_text");

  const api_json_call = document.querySelector("p.api_json");
  const api_json_res = document.querySelector("span.api_json");

  // p.api_text가 화면에 있으면 동작
  if (api_text_call) {
    api_text_call.addEventListener("click", (e) => {
      fetch("/api/text")
        .then((res) => {
          return res.text();
        })
        .then((result) => {
          console.log(result);
          api_text_res.innerText = result;
        });
    });
  }

  if (api_json_call) {
    // promise 방식으로 비동기 함수를 동기식으로 실행시키기
    // async / await 는 브라우저에 따라 작동이 안될수도 있다
    // 동기식으로 실행할 함수들을 감싸는 외부함수에 async 설정
    api_json_call.addEventListener("click", async (e) => {
      // 각 실행함수 앞에 await 설정하기
      const res = await fetch("/api/json");
      const result = await res.json();
      await console.log(result);

      let json_html = `<span>${result.j_name}</span>&nbsp;`;
      json_html += `<span>${result.j_addr}</span>&nbsp;`;
      json_html += `<span>${result.j_tel}</span>&nbsp;`;
      json_html += `<span>${result.j_age}</span>`;

      api_json_res.innerHTML = json_html;
    });
  }
});
