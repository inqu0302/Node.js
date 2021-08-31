
CREATE USER 'one'@'%' 
identified by'12341234';

GRANT ALL privileges ON *.* 
TO 'one'@'%';

CREATE DATABASE posDB;

USE posDB;

drop table tbl_products;
drop table tbl_orders;

desc table tbl_producttbl_productss;
desc table tbl_orders;

SELECT * FROM tbl_products;

INSERT INTO tbl_products(
p_code = p0001,


SELECT * FROm tbl_orders;