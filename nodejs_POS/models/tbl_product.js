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
  return product;
};
