using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SPMedGroup.WebApi.Domains;
using Senai.SPMedGroup.WebApi.Interfaces;
using Senai.SPMedGroup.WebApi.Repositories;
using SpMedGroup.Repositories;

namespace Senai.SPMedGroup.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasMongoController : ControllerBase
    {
        private IConsultaMongoRepository ConsultasMongoRepository { get; set; }

        public ConsultasMongoController()
        {
            ConsultasMongoRepository = new ConsutaMongoRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(ConsultasMongo consultasMongo)
        {
            try
            {
                ConsultasMongoRepository.Cadastrar(consultasMongo);
                return Ok();
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(ConsultasMongoRepository.Listar());
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
    }
}