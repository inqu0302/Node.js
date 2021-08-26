const fontNames = [
  "맑은 고딕",
  "궁서",
  "굴림",
  "바탕체",
  "Arial",
  "Arial Black",
  "Comic Sans Ms",
  "Courier New",
];

const fontSizes = [
  "8",
  "9",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
];

const toolbar = [
  "fontName",
  "fontsize",
  "style",
  "color",
  "table",
  "height",
  ["para", ["ul", "ol"]],
  ["view", ["fullscreen", "help", "codeview"]],
];

// JQuery 를 사용하여 summernote 적용하기
$(function () {
  $("#b_text").summernote({
    lang: "ko-KR",
    toolbar,
    fontName: fontNames,
    fontSize: fontSizes,
    placeholder: "본문을 입력하세요",
    width: "90%",
    height: "300px",

    // summernot를 사용할때 설정하는 event 핸들러
    callbacks: {
      /**
       * summernote 입력창에 이미지를 drag-and-drop 할때 발생하는 event
       *
       * summernote 입력창에 이미지를 가져다 놓으면 입력창에 바로 이미지를 추가하면서
       * 글을 작성할 수 있게 해준다
       *
       * 이런식으로 이미지를 추가하면 작성되는 글 내용에 이미지가 encoding된 코드로 변경이 되고
       * 글 내용의 크기가 커지게 된다
       * DB에 내용을 저장하려면 BLOB, CLOB 타입으로 칼럼을 을 만들고 저장해야 한다
       * 일반적으로 Web Server App에서는 한꺼번에 대량의 text를 업로드하는걸 허용하지 않는다
       * 또한 BLOB, CLOB 타입을 가진 테이블은 용량이 커져 무거워 지고 검색을 하기에 용이하지 않다
       *
       * MySQL에서는 BLOB보다는 Text type이나 VACHAR(4000)와 같은 type으로만 칼럼설정을 권장한다
       * 그래서 summernot에 이미지를 올리면 eventHendler를 통해 이미지만 ajax를 통해 서버로 올리고
       * 해당 경로만 text에 담아서 올리게 된다
       *
       * onImageUpload 가 호출되면 fileUpfetch 를 호출
       * 이벤트가 발생하면 drop 한 이미지들의 정보(files)와,
       * summernote 자신(객체)의 정보(editor)를 함수에 전달
       *
       * fileUpfetch()함수에 drop한 파일정보를 전달
       */
      onImageUpload: function (files) {
        fileUpfetch(files);
      },
    },
  });
});
