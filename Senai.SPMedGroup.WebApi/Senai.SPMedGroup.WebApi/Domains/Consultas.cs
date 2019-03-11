using System;
using System.Collections.Generic;

namespace Senai.SPMedGroup.WebApi.Domains
{
    public partial class Consultas
    {
        public int Id { get; set; }
        public int IdProntuario { get; set; }
        public int IdMedico { get; set; }
        public DateTime DataConsulta { get; set; }
        public int IdSituacao { get; set; }
        public string Observacoes { get; set; }

        public Medicos IdMedicoNavigation { get; set; }
        public SituacaoDaConsulta IdSituacaoNavigation { get; set; }
    }
}
