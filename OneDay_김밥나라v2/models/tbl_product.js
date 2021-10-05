module.exports = (sequelize, DataTypes) => {
  // 상품정보 테이블 생성
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

  // PK 와 orders 테이블 to_pcode랑 JOIN
  product.associate = (models) => {
    product.hasMany(models.tbl_orders, { foreignKey: "to_pcode" });
  };

  return product;
};
