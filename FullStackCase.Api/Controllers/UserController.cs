using FullStackCase.Api.Data;
using FullStackCase.Api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        // GET: api/user/me
        [HttpGet("me")]
        [Authorize]
        public IActionResult GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId);
            if (user == null) return NotFound();

            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            });
        }
        // PATCH: api/user/me
        [HttpPatch("me")]
        [Authorize]
        public IActionResult UpdateProfile([FromBody] User updatedUser)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId);
            if (user == null) return NotFound();

            // Sadece gelen alanları güncelle
            if (!string.IsNullOrEmpty(updatedUser.Username))
                user.Username = updatedUser.Username;

            if (!string.IsNullOrEmpty(updatedUser.Email))
                user.Email = updatedUser.Email;

            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
                user.PasswordHash = updatedUser.PasswordHash;

            _context.SaveChanges();

            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            });
        }


    }
}
