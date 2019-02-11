bulk insert prontuario
from 'C:\db\prontuario.csv'
	with(
		format = 'csv',
		firstrow = 2, -- primeira linha de dados = 2 
		fieldterminator = ';', -- separador de campos = ';'
		rowterminator = '\n', -- separador de linhas = '\n'
		CODEPAGE = 'ACP', -- codificação dos dados = 'ACP'
		DATAFILETYPE = 'Char' -- tipo do arquivo = 'Char'
	);

	select * from prontuario

bulk insert consultas
from 'C:\db\consultas.csv'
	with(
		format = 'csv'
		,firstrow = 2
		,fieldterminator = ';'
		,rowterminator = '\n'
		,codepage = 'acp'
		,datafiletype = 'char'
	);

bulk insert especialidades
from 'C:\db\especialidades.csv'
	with(
		format = 'csv'
		,firstrow = 2
		,fieldterminator = ';'
		,rowterminator = '\n'
		,codepage = 'acp'
		,datafiletype = 'char'
	);

bulk insert medicos
from 'C:\db\medico.csv'
	with(
		format = 'csv',
		firstrow = 2,
		fieldterminator = ';',
		rowterminator = '\n',
		CODEPAGE = 'ACP',
		DATAFILETYPE = 'Char'
	);

bulk insert situacao_da_consulta
from 'C:\db\situacao.csv'
	with(
		format = 'csv',
		firstrow = 2,
		fieldterminator = ';',
		rowterminator = '\n',
		CODEPAGE = 'ACP',
		DATAFILETYPE = 'Char'
	);

	select * from TIPO_DE_USUARIO order by id

	update TIPO_DE_USUARIO set NOME = 'Administrador' WHERE id = 1

bulk insert tipo_de_usuario
from 'C:\db\tipo de usuario.csv'
	with(
		format ='csv',
		firstrow = 3,
		fieldterminator = ';',
		rowterminator = '\n',
		codepage = 'acp',
		datafiletype = 'char'
);

select * from TIPO_DE_USUARIO order by id

bulk insert usuarios
from 'C:\db\usuarios.csv'
	with(
		format = 'csv',
		firstrow = 2,
		fieldterminator = ';',
		rowterminator = '\n',
		codepage = 'acp',
		datafiletype = 'char'
);

select * from USUARIOS order by id

bulk insert clinica
from 'C:\db\clinica.csv'
	with(
		format = 'csv',
		firstrow = 2,
		fieldterminator = ';',
		rowterminator = '\n',
		codepage = 'acp',
		datafiletype = 'char'
	);

select * from CLINICA