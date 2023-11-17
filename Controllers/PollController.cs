using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Polling.Backend.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class PollController : ControllerBase
    {
        public string Index()
        {
            return $"Polling Endpoint at {DateTime.Now}";
        }

        [HttpGet("longpoll")]
        public async Task<IActionResult> LongPolling(CancellationToken cancellationToken)
        {
            // Simulate a long running task
            await Task.Delay(TimeSpan.FromSeconds(20), cancellationToken);

            // After the delay, return a response
            return Ok("Response after 20 seconds");
        }

    }


}
