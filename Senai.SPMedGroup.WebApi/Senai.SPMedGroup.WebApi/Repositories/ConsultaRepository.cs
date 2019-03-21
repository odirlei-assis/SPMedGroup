using Microsoft.EntityFrameworkCore;
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
        public void Alterar(Consultas consulta)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                ctx.Consultas.Update(consulta);
                ctx.SaveChanges();
            }
        }

        public Consultas BuscarConsultaPorId(int id)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                // Consultas consultaProcurada = ctx.Consultas.Find(id);
                Consultas consultaProcurada = ctx.Consultas.Include(x => x.IdMedicoNavigation).FirstOrDefault(x => x.Id == id);

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

        public List<Consultas> ListarConsultas()
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                return ctx.Consultas.ToList();
            }
        }

        public List<Consultas> ListarConsultasMedico(int id)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                Medicos medicoP = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == id);

                return ctx.Consultas.Where(x => x.IdMedicoNavigation.Id == medicoP.Id).ToList();
            }
        }

        public List<Consultas> ListarConsultasPaciente(int id)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                Prontuario prontuarioP = ctx.Prontuario.FirstOrDefault(x => x.IdUsuario == id);

                return ctx.Consultas.Where(x => x.IdProntuarioNavigation.Id == prontuarioP.Id).ToList();
            }
        }
    }
}
