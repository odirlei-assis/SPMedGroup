﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SPMedGroup.WebApi.Domains
{
    public class ConsultasMongo
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("doenca")]
        [BsonRequired]
        public string Doenca { get; set; }

        [BsonElement("latitude")]
        [BsonRequired]
        public string Latitude { get; set; }

        [BsonElement("longitude")]
        [BsonRequired]
        public string Longitude { get; set; }

        [BsonElement("idade")]
        [BsonRequired]
        public int Idade { get; set; }

        [BsonElement("genero")]
        [BsonRequired]
        public string Genero { get; set; }

        [BsonElement("dataCadastro")]
        [BsonRequired]
        public DateTime DataCriacao { get; set; }

        [BsonElement("especialidade")]
        [BsonRequired]
        public string Especialidade { get; set; }

        [BsonElement("idconsulta")]
        [BsonRequired]
        public string IdConsulta { get; set; }
    }
}
