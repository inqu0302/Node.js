-- % : 어디에서나 접근가능
CREATE USER 'node'@'%' 
identified by'12341234';

-- 모든 권한 부여
GRANT ALL privileges ON *.* 
TO 'node'@'%';

CREATE DATABASE nodeDB;
USE nodeDB;
desc tbl_bbs;
desc tbl_replies;
drop table tbl_bbs;
drop table tbl_replies;
select * from tbl_replies;

DROP TABLE tbl_products;
SHOW TABLES;
DESC tbl_products;

INSERT INTO tbl_products(p_code, p_name, p_price)
VALUES 
('p0001', '1000원 김밥', 1000 ),
('p0002', '참치 김밥', 1500 ),
('p0003', '땡초 김밥', 1500 ),
('p0004', '김치찌개', 5000 ),
('p0005', '떡볶이', 3000 ),
('p0006', '라볶이', 3500 ),
('p0007', '치즈 떡볶이', 4000 ),
('p0008', '돈가스', 6000 ),
('p0009', '치즈 돈가스', 7000 ),
('p0010', '라면', 2000 );

select * from tbl_products;

select * from tbl_table_orders;
DROP TABLE tbl_table_orders;
DROP TABLE tbl_products;
DESC tbl_table_orders;

SELECT to_table_id, count(to_table_id)
FROM tbl_table_orders
WHERE to_pay IS NULL
GROUP BY to_table_id;
