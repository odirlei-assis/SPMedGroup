﻿using Senai.SPMedGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Interfaces
{
    public interface IClinicaRepository
    {
        void Cadastrar(Clinica clinica);
    }
}
