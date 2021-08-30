
CREATE USER 'one'@'%' 
identified by'12341234';

GRANT ALL privileges ON *.* 
TO 'one'@'%';

CREATE DATABASE posDB;

USE posDB;

drop table tbl_products;
drop table tbl_orders;

desc table tbl_products;
desc table tbl_orders;

SELECT * FROM tbl_products;

SELECT * FROm tbl_orders;