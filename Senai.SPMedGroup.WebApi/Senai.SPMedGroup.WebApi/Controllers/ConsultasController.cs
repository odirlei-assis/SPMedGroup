using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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

        [Authorize]
        [HttpGet]
        public IActionResult ListarConsultas()
        {
            try
            {
                int id = Convert.ToInt32(HttpContext.User.Claims.First(x => x.Type == JwtRegisteredClaimNames.Jti).Value);

                string role = HttpContext.User.Claims.First(x => x.Type == ClaimTypes.Role).Value;

                if (role == "Administrador")
                {
                    ConsultaRepository.ListarConsultas();
                }
                else if (role == "Médico")
                {
                    ConsultaRepository.ListarConsultasMedico(id);
                }
                else
                {
                    ConsultaRepository.ListarConsultasPaciente(id);
                }

                return Ok();
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

        [Authorize(Roles = "Administrador")]
        [HttpPut("AlterarSituacao")]
        public IActionResult AlterarSituacao(Consultas consulta)
        {
            try
            {
                Consultas consultaAlterada = ConsultaRepository.BuscarConsultaPorId(consulta.Id);

                consultaAlterada.IdSituacao = consulta.IdSituacao;
                ConsultaRepository.Alterar(consultaAlterada);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Error" + ex.Message});
            }
        }

        [Authorize(Roles = "Médico")]
        [HttpPut("AlterarObservacao")]
        public IActionResult AlterarObservacao(Consultas consulta)
        {
            try
            {
                Consultas consultaAlterada = ConsultaRepository.BuscarConsultaPorId(consulta.Id);

                if (consultaAlterada.Observacoes == null)
                {
                    return BadRequest("Insira a Observação");
                }

                consultaAlterada.Observacoes = consulta.Observacoes;
                ConsultaRepository.Alterar(consultaAlterada);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Error" + ex.Message });
            }
        }
    }
}