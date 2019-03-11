﻿using System;
using System.Collections.Generic;

namespace Senai.SPMedGroup.WebApi.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medicos = new HashSet<Medicos>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string Endereço { get; set; }

        public ICollection<Medicos> Medicos { get; set; }
    }
}
