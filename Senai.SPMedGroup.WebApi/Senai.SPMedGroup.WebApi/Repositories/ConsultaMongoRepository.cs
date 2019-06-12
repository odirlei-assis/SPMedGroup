using MongoDB.Driver;
using Senai.SPMedGroup.WebApi.Domains;
using Senai.SPMedGroup.WebApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace SpMedGroup.Repositories
{
    public class ConsutaMongoRepository : IConsultaMongoRepository
    {
        private readonly IMongoCollection<ConsultasMongo> _consultas;

        public ConsutaMongoRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("spmedgroup");
            _consultas = database.GetCollection<ConsultasMongo>("consultas");
        }

        public void Cadastrar(ConsultasMongo consulta)
        {
            _consultas.InsertOne(consulta);
        }

        public List<ConsultasMongo> Listar()
        {
            return _consultas.Find(_ => true).ToList();
        }
    }
}