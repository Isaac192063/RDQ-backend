INSERT INTO public."roles"(name)
VALUES ('user'),
       ('admin');

       INSERT INTO distributor_cylinders.contents(
	 name, color)
	VALUES ( 'OX IND', 'Verde'),
	('OXI','gris'),
	('ARG','negro'),
	('NITRO','dorado'),
	('MEZCLA','azul verdoso'),
	('CO2','rojo'),
	('ACET','negro'),
	('AIRE','gris os');

INSERT INTO distributor_cylinders.type_packagings(
	size, pressure_amount)
	VALUES ( 6.5, 'M3'),
	(6,'M3'),
	(5,'M3'),
	(4,'M3'),
	(3,'M3'),
	(2,'M3'),
	(1,'M3'),
	(1,'KG'),
	(10,'KG' ),
	(20,'KG'),
	(25,'KG');