﻿using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class MateriaDto
    {
        [Key]
        public int MateriaId { get; set; }
        public string Nombre { get; set; }
        public int Creditos { get; set; } 

    }
}
