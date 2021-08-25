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
  ["view", ["fullscreen", "help"]],
  ["insert", ["link"]],
];

$("#b_text").summernote({
  lang: "ko-KR",
  toolbar,
  fontNames: fontNames,
  fontSize: fontSizes,
  placeholder: "본문을 입력하세요",
  width: "90%",
  height: "300px",
});
