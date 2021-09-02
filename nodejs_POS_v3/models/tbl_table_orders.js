module.exports = (seq, Type) => {
  const table_orders = seq.define("tbl_table_orders", {
    to_seq: { type: Type.INTEGER, autoIncrement: true, primaryKey: true }, // 일변번호(PK)
    to_table_id: { type: Type.STRING(5), allowNull: false }, // 주문이 진행중인 table_id
    to_pcode: { type: Type.STRING(5), allowNull: false }, // 주문된 상품코드
    to_qty: { type: Type.INTEGER }, // 수량
    to_price: { type: Type.INTEGER }, // 단가
    to_date: { type: Type.STRING(10) }, // 주문한 날짜
    to_time: { type: Type.STRING(10) }, // 주문한 시간
    to_pay: { type: Type.STRING(1) }, // 결제여부
    to_pay_qty: { type: Type.STRING(10) }, // 경제종류(현금,카드)
  });

  // belongsTo() 설정에서 foreignKey를 설정하는 것은 JOIN을 수행할때
  // 다른 칼럼으로 연결되는것을 방지하는 명시적인 코딩
  // 여기에서 foreignKey 설정은 명시적 설정이고 자기자신 칼럼을 지정
  table_orders.associate = (models) => {
    table_orders.belongsTo(models.tbl_product, { foreignKey: "to_pcode" });
  };

  return table_orders;
};
