using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SPMedGroup.WebApi.Domains;
using Senai.SPMedGroup.WebApi.Interfaces;
using Senai.SPMedGroup.WebApi.Repositories;

namespace Senai.SPMedGroup.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]

    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository{ get; set; }

        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut]
        public IActionResult Alterar(Usuarios usuario)
        {
            try
            {
                UsuarioRepository.Alterar(usuario);
                return Ok("Usuario Alterado!");
            }
            catch (Exception)
            {
                return BadRequest("Erro!");
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Usuarios usuario)
        {
            try
            {
                UsuarioRepository.Cadastrar(usuario);
                return Ok(new { mensagem = "Usuario Cadastrado!"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message + "Error!"});
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete]
        public IActionResult Deletar(Usuarios usuario)
        {
            try
            {
                UsuarioRepository.Deletar(usuario);
                return Ok("Usuario Deletado!");
            }
            catch (Exception)
            {
                return BadRequest("Erro!");
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(UsuarioRepository.Listar());
            }
            catch (Exception)
            {
                return BadRequest("Erro!");
            }
        }
    }
}