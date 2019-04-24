using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SPMedGroup.WebApi.Interfaces;
using Senai.SPMedGroup.WebApi.Repositories;

namespace Senai.SPMedGroup.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProntuariosController : ControllerBase
    {
        private IProntuarioRepository ProntuarioRepository { get; set; }

        public ProntuariosController()
        {
            ProntuarioRepository = new ProntuarioRepository();
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(ProntuarioRepository.ListarProntuarios());
            }
            catch (Exception)
            {
                return BadRequest("Erro!");
            }
        }
    }
}