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
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository ClinicaRepository { get; set; }

        public ClinicasController()
        {
            ClinicaRepository = new ClinicaRepository();
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult CadastrarClinica(Clinica clinica)
        {
            try
            {
                ClinicaRepository.Cadastrar(clinica);
                return Ok(new { mensagem = "Clinica Cadastrada!"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Error" + ex.Message});
            }
        }
    }
}