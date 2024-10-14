using System.Security.Claims;

namespace FastMarketBackEnd.Helpers
{
    public class TokenHelper
    {
        public static int ObtenerIdPersona(ClaimsPrincipal user)
        {
            var personaIdClaim = user.Claims.FirstOrDefault(c => c.Type == "IdPersona");
            if (personaIdClaim == null)
            {
                throw new UnauthorizedAccessException("No se pudo obtener el IdPersona del token.");
            }

            if (int.TryParse(personaIdClaim.Value, out var idPersona))
            {
                return idPersona;
            }

            throw new UnauthorizedAccessException("El valor de IdPersona en el token no es válido.");
        }
    }
}
