using Senai.SPMedGroup.WebApi.Domains;
using Senai.SPMedGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public Consultas BuscarConsultaPorId(int id)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                Consultas consultaProcurada = ctx.Consultas.Find(id);

                if (consultaProcurada == null)
                {
                    return null;
                }
                return consultaProcurada;
            }
        }

        public void CadastrarConsulta(Consultas consulta)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                ctx.Consultas.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public void DeletarConsulta(Consultas consulta)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                ctx.Consultas.Remove(consulta);
                ctx.SaveChanges();
            }
        }

        public List<Consultas> ListarConsultas()
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                return ctx.Consultas.ToList();
            }
        }
    }
}
