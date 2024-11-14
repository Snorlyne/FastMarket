using FastMarketBackEnd.Helpers;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;

[ApiController]
[Route("[controller]")]
public class VentasController : ControllerBase
{
    private readonly IVentasServices _ventasService;

    public VentasController(IVentasServices ventasService)
    {
        _ventasService = ventasService;
    }

    [HttpGet("Ventas")]
    public async Task<IActionResult> GetVenats()
    {
        // Usar el helper para obtener el IdPersona del token
        int idPersona = TokenHelper.ObtenerIdPersona(User);
        var ventas = await _ventasService.ObtenerAnunciosVendidos(idPersona);
        return Ok(ventas);
    }

    [HttpGet("Compras")]
    public async Task<IActionResult> GetCompras()
    {
        // Usar el helper para obtener el IdPersona del token
        int idPersona = TokenHelper.ObtenerIdPersona(User);
        var compras = await _ventasService.ObtenerAnunciosComprados(idPersona);
        return Ok(compras);
    }
}
