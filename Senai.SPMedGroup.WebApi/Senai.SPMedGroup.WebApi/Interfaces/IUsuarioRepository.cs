using Senai.SPMedGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Interfaces
{
    interface IUsuarioRepository
    {
        Usuarios BuscarPorEmailSenha(string email, string senha);

        void Cadastrar(Usuarios usuario);

        void Alterar(Usuarios usuario);

        void Deletar(Usuarios usuario);

        List<Usuarios> Listar();
    }
}
