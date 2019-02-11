select * from USUARIOS

select * from PRONTUARIO order by id

SELECT CONVERT(VARCHAR(10), data_nascimento, 110) AS [MM-DD-YYYY] from PRONTUARIO

select * from MEDICOS

create procedure Medicos_Especialidade
	@NOME varchar(100)
as
begin
	select count(*) from MEDICOS inner join ESPECIALIDADES
	on MEDICOS.ID_ESPECIALIDADE = ESPECIALIDADES.ID and
	ESPECIALIDADES.NOME = @NOME
end;

drop procedure Medicos_Especialidade

exec Medicos_Especialidade 'Psiquiatria';

SELECT FLOOR(DATEDIFF(DAY, data_nascimento, GETDATE()) / 365.25) from prontuario