using Senai.SPMedGroup.WebApi.Domains;
using Senai.SPMedGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Repositories
{
    public class ProntuarioRepository : IProntuarioRepository
    {
        public List<Prontuario> ListarProntuarios()
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                return ctx.Prontuario.ToList();
            }
        }
    }
}
