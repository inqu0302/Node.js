const total_pay = {};

// fetch를 통해서 되돌려 받은 주문리스트를 왼쪽의 주문리스트에 출력하기
const add_order_list = (order_list) => {
  const order_box = document.querySelector("table.order_list tbody");

  // list가 중복되어 표시되는것을 방지하기 위하여
  // 기존에 div.order_list가 있는지 확인하고
  // div.order_list를 가져와서, 전체를 article.order_list로 부터 삭제
  let order_tr_list = document.querySelectorAll("table.order_list tbody tr");
  if (order_tr_list) {
    order_tr_list.forEach((tr) => {
      order_box.removeChild(tr);
    });
  }

  // 비어있는 total_pay에 각 item을 추가하면서 값을 저장
  total_pay.title = "합계";
  total_pay.count = 0;
  total_pay.qty = 0;
  total_pay.b1 = "";
  total_pay.total = 0;
  total_pay.b2 = "";

  const orders = order_list.map((order, index) => {
    const order_item = [
      order.to_pcode,
      order.tbl_product.p_name,
      order.to_qty,
      order.to_price,
      order.to_qty * order.to_price,
      "X",
    ];

    total_pay.count++;
    total_pay.qty += order.to_qty;
    total_pay.total += order.to_qty * order.to_price;

    const order_tds = order_item.map((item) => {
      const td = document.createElement("TD");
      td.innerText = item;
      td.dataset.order_seq = order.to_seq;
      return td;
    });

    const order_tr = document.createElement("TR");
    order_tr.append(...order_tds);
    return order_tr;
  });
  // order list 완성
  order_box.append(...orders);

  // 결과(합계) 표현
  // Object.keys(JSON)
  // JSON 객체의 key 값만 추출하여 Object 배열로 만들어 준다
  const pay_tds = Object.keys(total_pay).map((key) => {
    const td = document.createElement("TD");

    td.innerText = total_pay[key];
    td.style.backgroundColor = "#bbb";
    return td;
  });

  const pay_tr = document.createElement("TR");
  pay_tr.append(...pay_tds);

  order_box.appendChild(pay_tr);
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
      getOrders(table_id);
    });
};

const getOrders = (table_id) => {
  // 주문서 화면이 열릴때 table에 내용이 있으면 출력
  // RESTFull 로 변경
  fetch(`/pos/order/${table_id}/getlist`)
    .then((res) => res.json())
    .then((result) => add_order_list(result));
};

// DOMContentLoaded event를 설정하면 어느위치에 삽입해도 문제가 없다
document.addEventListener("DOMContentLoaded", () => {
  // 현재 화면(주문화면)이 열리면
  // table_id값을 추출하기 위하여
  // article.order_list에서 dataset을 추출하여 변수에 담기
  const order_article = document.querySelector("article.order_list");
  const table_id = order_article.dataset.table_id;

  const order_table = document.querySelector("table.order_list");

  const pay_box = document.querySelector("div.pay_box");

  // article.product_list 의 div.menu가 클릭이 되면
  const menu_article = document.querySelector("article.menu_list");

  if (menu_article) {
    menu_article.addEventListener("click", (e) => {
      const target = e.target;

      // index.pug의 table layout click 설정
      if (target.tagName === "DIV" && target.className.includes("menu")) {
        const menu_id = target.dataset.menu_id;
        // alert(menu_id + "가 선택됨");
        // document.location.href = `/pos/order/input/${menu_id}`

        // fetch 전송을 위한 함수 호출
        order_input(table_id, menu_id);
      }
    });
  }

  if (order_table) {
    order_table.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "TD" && target.innerText === "X") {
        const order_seq = target.dataset.order_seq;
        // alert(order_seq);
        if (confirm("주문 메뉴를 삭제합니다!!!")) {
          fetch(`/pos/order/${order_seq}/delete`)
            // router 에서  res.send()로 보냈기때문에 text로 사용한다
            // retur이 하나일때는 한줄로생략가능
            // .then((res)=>{
            // 	return res.text()
            // })
            .then((res) => res.text())
            .then((result) => {
              if (result === "OK") {
                getOrders(table_id);
              }
            });
        }
      }
    });
  }
  // 화면이 열릴때 실행될 코드
  getOrders(table_id);

  if (pay_box) {
    pay_box.addEventListener("click", (e) => {
      const button = e.target;

      let pay_text = "";
      if (button.className.includes("btn_pay_cash")) {
        pay_text = "현금결제";
      } else if (button.className.includes("btn_pay_card")) {
        pay_text = "카드결제";
      } else if (button.className.includes("btn_table_layout")) {
        document.location.href = "/";
      }
      if (button.tagName === "BUTTON") {
        const modal = document.querySelector("div.modal");
        modal.style.display = "flex";
        document.querySelector("span.pay_qty").innerText = pay_text;
        document.querySelector("span.pay_total").innerText = total_pay.total;
      }
    });
  }

  // x 버튼을 클릭하여 modal창 닫기
  document.querySelector("div.close span").addEventListener("click", (e) => {
    document.querySelector("div.modal").style.display = "none";
  });

  document
    .querySelector("button.btn_pay_complete")
    .addEventListener("click", () => {
      if (confirm("결제를 진행할까요?")) {
        // 현재 table_id 값을 getter
        const article_order = document.querySelector("article.order_list");
        const table_id = article_order.dataset.table_id;

        // fetch로 서버에 결제완료 요청
        fetch(`/pos/paycomplet/${table_id}`)
          .then((res) => res.text())
          .then((result) => {
            if (result === "OK") {
              document.querySelector("div.modal").style.display = "none";
              getOrders(table_id);
              location.href = "/";
            }
          });
      }
    });
});
