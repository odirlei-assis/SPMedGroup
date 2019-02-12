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

SELECT FLOOR(DATEDIFF(DAY, data_nascimento, GETDATE()) / 365.25) as Idade from prontuario

create clustered index index_prontuario_rg
	on prontuario (rg);

select * from PRONTUARIO

create trigger quantidade_usuarios
	on usuarios after insert
	as begin
	select count (*) from USUARIOS
	end

create procedure Inserir_Usuarios
	@EMAIL varchar(250)
   ,@SENHA varchar(250)
   ,@ID_TIPO_USUARIO varchar(100)
as
begin
	insert into USUARIOS(EMAIL, SENHA, ID_TIPO)
	values (@EMAIL, @SENHA, @ID_TIPO_USUARIO)
end

exec Inserir_Usuarios 'O@O.O', '123456','1'