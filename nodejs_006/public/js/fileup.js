// JS 함수선언
// fileUp파일에서 0번째 파일을 추출하여 서버로 보내는 코드
// 바닐라JS 를 이용한 코드
const fileUpfetch = (files) => {
  // ajax(fetch)를 사용하여 파일을 서버로 전송
  // 1. JS의 FormData 클래스를 사용하여 객체(blank) 생성
  const formData = new FormData();
  // summernote 에서 files리스트로 파일을 받고 upfile이라는 변수에 담아서 서버로 전송
  // 2. 생성된 fordata 객체에
  // upFile이라는 변수를 생성하면서 summernote에게 받은 리스트중 첫번째 정보를 저장
  formData.append("upFile", files[0]);

  //   alert(files[0].originalFileName);
  // 3. fileUp 파일에 POST 방식으로 formData를 보내겠다
  fetch("/file/fileUp", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      $("#b_text").summernote("insertImage", "/images/" + result.fileName);
      console.log(result);
    });
};

// JQuery의 ajax 를 이용한 코드
// file Upload 하기
const fileUpAjax = (files, editor) => {
  const formData = new FormData();
  formdata.append("file", files[0]);

  $.ajax({
    url: "/file/fileUp",
    data: formData,
    type: "POST",
    processData: false,
    contentType: false,
  });
};
