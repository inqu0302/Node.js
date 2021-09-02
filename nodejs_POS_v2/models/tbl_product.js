module.exports = (sequelize, DataTypes) => {
  // tbl_product가 table의 이름(변수, 객체)
  // tbl_product.findAll() 등으로 사용한다
  const product = sequelize.define(
    "tbl_product",
    {
      p_code: { type: DataTypes.STRING(5), primaryKey: true },
      p_name: { type: DataTypes.STRING, allowNull: false },
      p_price: { type: DataTypes.INTEGER, allowNull: false },
      p_rem: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );

  // tbl_table_orders와 tbl_product를 JOIN 할수 있도록 설정
  // 상품 1 : 주문서 : N  / 1 : N 관계
  // tbl_table_oders의 to_pcode 칼럼과 현재 tbl_product와 연계하겠다
  // 현재 테이블의 pk와 to_pcode를 JOIN할 준비
  product.associate = (models) => {
    product.hasMany(models.tbl_table_orders, { foreignKey: "to_pcode" });
  };

  return product;
};
