using FullStackCase.Api.Data;
using FullStackCase.Api.Domain;
using Microsoft.AspNetCore.Mvc;

namespace FullStackCase.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // POST api/user
        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user); // eklenen user'i döner
        }
        // GET api/user
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

    }
}
