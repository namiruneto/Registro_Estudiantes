namespace Registro_Estudiantes.Server.Model.Request
{
    public class NuevoMensaje : AvailableMaterial
    {
        public int IdContacto { get; set; }
        public string Sender { get; set; }
        public string Mensaje { get; set; }
    }
}
