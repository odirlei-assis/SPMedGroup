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

        List<Consultas> ListarConsultas();

        Consultas BuscarConsultaPorId(int id);

        void Alterar(Consultas consulta);

        List<Consultas> ListarConsultasPaciente(int id);

        List<Consultas> ListarConsultasMedico(int id);
    }
}
