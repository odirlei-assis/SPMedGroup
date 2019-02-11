select * from USUARIOS

select * from PRONTUARIO order by id

SELECT CONVERT(VARCHAR(10), data_nascimento, 110) AS [MM-DD-YYYY] from PRONTUARIO

select * from MEDICOS

select count(*) from MEDICOS inner join ESPECIALIDADES
on MEDICOS.ID_ESPECIALIDADE = ESPECIALIDADES.ID and
ESPECIALIDADES.NOME = 'Psiquiatria'

SELECT FLOOR(DATEDIFF(DAY, data_nascimento, GETDATE()) / 365.25) from prontuario
select * from PRONTUARIO order by id
