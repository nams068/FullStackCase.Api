using FullStackCase.Api.Data;
using FullStackCase.Api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FullStackCase.Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

           // POST api/auth/register
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            // password hashle
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            // kaydet
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user); // eklenen user'i döner
        }

        // POST api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == login.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(login.PasswordHash, user.PasswordHash))
                return Unauthorized();

            // JWT oluştur
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("this_is_a_super_long_demo_secret_key_1234!");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
     {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), 
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email)
    }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return Ok(new { Token = jwtToken });
        }

    }
}
