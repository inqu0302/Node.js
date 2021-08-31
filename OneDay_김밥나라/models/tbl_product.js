module.exports = (sequlize, DataTypes) => {
  return sequlize.define(
    "tbl_product",
    {
      p_code: { type: DataTypes.STRING(5), primaryKey: true },
      p_name: { type: DataTypes.STRING(30), allowNull: false },
      p_price: { type: DataTypes.INTEGER, allowNull: false },
      p_rem: { type: DataTypes.STRING(255) },
    },
    // createAt, updateAt 만들지 않기
    { timestamps: false }
  );
};
