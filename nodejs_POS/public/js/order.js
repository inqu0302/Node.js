// fetch를 통해서 되돌려 받은 주문리스트를 왼쪽의 주문리스트에 출력하기
const add_order_list = (menu_list) => {
  const order_box = document.querySelector("article.order_list");

  // list가 중복되어 표시되는것을 방지하기 위하여
  // 기존에 div.order_list가 있는지 확인하고
  // div.order_list를 가져와서, 전체를 article.order_list로 부터 삭제
  let order_list = document.querySelectorAll("div.order_list");
  if (order_list) {
    order_list.forEach((order_tag) => {
      order_box.removeChild(order_tag);
    });
  }

  // order_list라는 클래스를 가진 div를 생성
  const orders = menu_list.map((menu, index) => {
    order_list = document.createElement("div");
    order_list.classList.add("order_list");

    // div.menu_id tag를 만들어라
    const menu_id = document.createElement("div");
    menu_id.classList.add("menu_id");
    menu_id.innerText = menu.to_pcode;

    // div.menu_name tag를 만들어라
    const menu_name = document.createElement("div");
    menu_name.classList.add("menu_name");
    // menu_name.innerText = menu.p_name;

    const menu_qty = document.createElement("div");
    menu_qty.classList.add("menu_qty");
    menu_qty.innerText = menu.to_qty;

    const menu_price = document.createElement("div");
    menu_price.classList.add("menu_price");
    menu_price.innerText = menu.to_price;

    // order_list에 div들을 추가
    order_list.appendChild(menu_id);
    order_list.appendChild(menu_name);
    order_list.appendChild(menu_price);
    order_list.appendChild(menu_qty);

    return order_list;
    // order_box에 order_list를 추가
    // order_box.appendChild(order_list);
  });
  order_box.append(...orders);
};

// fetch를 사용하여 서버에 데이터를 요청하기 위해 별도의 함수 선언
const order_input = (table_id, menu_id) => {
  // path Varriable 방식으로 menu_id값을 URL에 포함하여 getter요청
  /**
   * 3번 테이블에 5번 메뉴를 추가하려고 한다면
   * localhost:3000/pos/order/3/input/5 와같은 URL를 요청한다
   * 이런식으로 만드는 URL 방식을 RESTfull 요청이라고 한다
   */

  fetch(`/pos/order/${table_id}/input/${menu_id}`)
    // response 받아서 어떤 값으로 추출할 것인가
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      add_order_list(result.order_list);
    });
};

// DOMContentLoaded event를 설정하면 어느위치에 삽입해도 문제가 없다
document.addEventListener("DOMContentLoaded", () => {
  // 현재 화면(주문화면)이 열리면
  // table_id값을 추출하기 위하여
  // article.order_list에서 dataset을 추출하여 변수에 담기
  const order_article = document.querySelector("article.order_list");
  const table_id = order_article.dataset.table_id;

  // article.product_list 의 div.menu가 클릭이 되면
  const product_article = document.querySelector("article.product_list");

  if (product_article) {
    product_article.addEventListener("click", (e) => {
      const target = e.target;

      // index.pug의 table layout click 설정
      if (target.tagName === "DIV" && target.className.includes("menu")) {
        const menu_id = target.dataset.menu_id;
        // alert(menu_id + "가 선택됨");
        // document.location.href = `/pos/order/input/${menu_id}`;

        // fetch 전송을 위한 함수 호출
        order_input(table_id, menu_id);
      }
    });
  }

  // 주문서 화면이 열릴때 table에 내용이 있으면 출력
  fetch(`/pos/getorder/${table_id}`)
    .then((res) => res.json())
    .then((result) => add_order_list(result));
});
