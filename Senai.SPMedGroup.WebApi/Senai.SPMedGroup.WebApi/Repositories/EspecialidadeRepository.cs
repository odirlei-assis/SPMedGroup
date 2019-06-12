using Senai.SPMedGroup.WebApi.Domains;
using Senai.SPMedGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Repositories
{
    public class EspecialidadeRepository : IEspecialidadeRepository
    {
        public List<Especialidades> ListarEspecialidades()
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                List<Especialidades> listaEspecialidades = ctx.Especialidades.ToList();

                return listaEspecialidades;
            }

        }
    }
}
