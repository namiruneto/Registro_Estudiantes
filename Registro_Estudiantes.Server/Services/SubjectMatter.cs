using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Registro_Estudiantes.Server.Data;
using Registro_Estudiantes.Server.Model.answer;
using Registro_Estudiantes.Server.Model.dto;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Repository;

namespace Registro_Estudiantes.Server.Services
{
    public class SubjectMatter
    {
        private readonly ApplicationDbContext _context;

        public SubjectMatter(ApplicationDbContext context)
        {
            _context = context;
        }

        public Mattern GetMattern(int IdStudent)
        {
            Mattern mattern = new Mattern();
            var profesorIdEstudiante = (from c in _context.Clases
                                        join e in _context.EstudiantesMaterias on c.MateriaId equals e.MateriaId
                                        join t in _context.Estudiantes on e.EstudianteId equals t.EstudianteId
                                        join u in _context.Users on t.UserId equals u.Id
                                        where u.Id == IdStudent
                                        select c.ProfesorId).ToList();

            var materias = (from m in _context.Materias
                            join c in _context.Clases on m.MateriaId equals c.MateriaId 
                            join t in _context.Profesores on c.ProfesorId equals t.ProfesorId into clasesGroup
                            from t in clasesGroup.DefaultIfEmpty()
                            where !profesorIdEstudiante.Contains(c.ProfesorId)
                            select new MatternDetall
                            {
                                MatternId = m.MateriaId,
                                Name = m.Nombre,
                                Credit = m.Creditos, 
                                NameTeacher = t.Nombre
                            }).ToList();
            mattern.Materias = materias;

            mattern.StudentMatternDtos = (from e in _context.EstudiantesMaterias
                                   join t in _context.Estudiantes on e.EstudianteId equals t.EstudianteId
                                   join u in _context.Users on t.UserId equals u.Id
                                   join m in _context.Materias on e.MateriaId equals m.MateriaId
                                   join c in _context.Clases on m.MateriaId equals c.MateriaId
                                   join p in _context.Profesores on c.ProfesorId equals p.ProfesorId
                                   where u.Id == IdStudent
                                   select new MatternDetall
                                   {
                                       MatternId = m.MateriaId,
                                       Name = m.Nombre,
                                       NameTeacher = p.Nombre
                                   }).ToList();

            return mattern;
        }

        public bool RegisterMatternUser(RegisterMattern register, out string Message)
        {
            Message = "";
            bool result = false;
            Student student = _context.Estudiantes.Where(x => x.UserId == register.UserId).FirstOrDefault();
            
            if (student != null)
            {
                if (_context.EstudiantesMaterias.Select(x => x.EstudianteId == student.EstudianteId).ToList().Count() > 2)
                {
                    Message = "No puede registrar mas de 3 materias";
                    return result;
                }
                _context.EstudiantesMaterias.Add(new StudentMatternDto
                {
                    MateriaId = register.MatternId,
                    EstudianteId = student.EstudianteId
                });
                _context.SaveChanges();
                result = true;
            }
            return result;
        }

        public bool RemoveMatternUser(RegisterMattern register)
        {
            bool result = false;
            Student student = _context.Estudiantes.Where(x => x.UserId == register.UserId).FirstOrDefault();
            if (student != null)
            {
                var estudianteMateria = _context.EstudiantesMaterias
                .Where(em => em.EstudianteId == student.EstudianteId && em.MateriaId == register.MatternId)
                .FirstOrDefault();

                if (estudianteMateria != null)
                {
                    _context.EstudiantesMaterias.Remove(estudianteMateria);
                    _context.SaveChanges();
                    result = true;
                }
            }
            return result;
        }

        public List<MatternDetall> SignMattern(int IdStudent)
        {
            var matterns = (from e in _context.EstudiantesMaterias
                                          join t in _context.Estudiantes on e.EstudianteId equals t.EstudianteId
                                          join u in _context.Users on t.UserId equals u.Id
                                          join m in _context.Materias on e.MateriaId equals m.MateriaId
                                          join c in _context.Clases on m.MateriaId equals c.MateriaId
                                          join p in _context.Profesores on c.ProfesorId equals p.ProfesorId
                                          where u.Id == IdStudent
                                          select new MatternDetall
                                          {
                                              MatternId = m.MateriaId,
                                              Name = m.Nombre,
                                              NameTeacher = p.Nombre
                                          }).ToList();
            return matterns;

        }
    }
}
