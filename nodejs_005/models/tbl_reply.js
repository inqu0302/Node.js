// 게시글 댓글용 테이블

module.exports = (sequelize, DataType) => {
  const reply = sequelize.define("tbl_reply", {
    r_postId: { type: DataType.INTEGER, allowNull: false },
    r_writer: { type: DataType.STRING, allowNull: false },
    r_content: { type: DataType.TEXT, allowNull: false },
  });

  // tbl_replay와 tbl_bbs의 FK 설정을 수행
  reply.associate = (models) => {
    reply.belongsTo(models.tbl_bbs);
  };

  return reply;
};
