using Domain.Dto;
using FastMarketBackEnd.Helpers;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;

[ApiController]
[Route("[controller]")]
public class MensajesController : ControllerBase
{
    private readonly IChatServices _mensajeService;

    public MensajesController(IChatServices mensajeService)
    {
        _mensajeService = mensajeService;
    }

    [HttpPost("Enviar/{idOferta}")]
    public async Task<IActionResult> EnviarMensaje(int idOferta, [FromBody] MensajesCreateDto request)
    {
        // Usar el helper para obtener el IdPersona del token
        int idPersona = TokenHelper.ObtenerIdPersona(User);
        var mensaje = await _mensajeService.EnviarMensaje(idOferta, idPersona, request.Contenido);

        if (mensaje != null)
        {
            return Ok(mensaje);
        }
        else
        {
            return BadRequest("No se pudo enviar el mensaje.");
        }
    }

    [HttpGet("Chat/{idOferta}")]
    public async Task<IActionResult> GetMensajesDeChatPorOferta(int idOferta)
    {
        // Usar el helper para obtener el IdPersona del token
        int idPersona = TokenHelper.ObtenerIdPersona(User);
        var mensajes = await _mensajeService.ObtenerMensajesChat(idPersona, idOferta);
        return Ok(mensajes);
    }

    [HttpGet("UltimosMensajes")]
    public async Task<IActionResult> GetUltimosMensajesPorOferta()
    {
        // Usar el helper para obtener el IdPersona del token
        int idPersona = TokenHelper.ObtenerIdPersona(User);
        var mensajes = await _mensajeService.ObtenerUltimosMensajes(idPersona);
        return Ok(mensajes);
    }
}
