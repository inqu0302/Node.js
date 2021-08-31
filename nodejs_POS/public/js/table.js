// DOMContentLoaded event를 설정하면 어느위치에 삽입해도 문제가 없다
document.addEventListener("DOMContentLoaded", () => {
  const main_section = document.querySelector("section.main");

  // section.main이 없는 page에서 scripte 오류가 나는것을 방지
  if (main_section) {
    main_section.addEventListener("click", (e) => {
      const target = e.target;

      // index.pug의 table layout click 설정
      if (target.tagName === "DIV" && target.className.includes("table")) {
        const table_id = target.dataset.table_id;
        // alert(table_id + "번 테이블 선택됨");
        document.location.href = `/pos/order/${table_id}`;
      }
    });
  }
});
