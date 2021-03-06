﻿using Senai.SPMedGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Interfaces
{
    interface IConsultaMongoRepository
    {
        void Cadastrar(ConsultasMongo consultaMongo);

        List<ConsultasMongo> Listar();
    }
}
