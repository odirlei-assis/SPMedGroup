using Senai.SPMedGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Interfaces
{
    interface IConsultaRepository
    {
        void CadastrarConsulta(Consultas consulta);

        void DeletarConsulta(Consultas consulta);

        List<Consultas> ListarConsultas();

        Consultas BuscarConsultaPorId(int id);
    }
}
