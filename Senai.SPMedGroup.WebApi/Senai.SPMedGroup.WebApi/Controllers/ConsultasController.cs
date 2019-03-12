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
using static System.Net.Mime.MediaTypeNames;

namespace Senai.SPMedGroup.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository ConsultaRepository { get; set; }

        public ConsultasController()
        {
            ConsultaRepository = new ConsultaRepository();
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult CadastrarConsulta(Consultas consulta)
        {
            try
            {
                ConsultaRepository.CadastrarConsulta(consulta);
                return Ok(new { mensagem = "Consulta Cadastrada!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro!" + ex.Message });
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete]
        public IActionResult DeletarConsulta(Consultas consulta)
        {
            try
            {
                ConsultaRepository.DeletarConsulta(consulta);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro!" + ex.Message });
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult ListarConsultas()
        {
            try
            {
                return Ok(ConsultaRepository.ListarConsultas());
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro!" + ex.Message });
            }
        }

        [HttpGet("BuscaComId/{id}")]
        public IActionResult BuscarConsultaPorId(int id)
        {
            try
            {
                Consultas consultas = ConsultaRepository.BuscarConsultaPorId(id);
                if (consultas == null)
                {
                    return NotFound("Consulta Não Encontrada!");
                }

                return Ok(consultas);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}