using API.Data;
using API.DTOs;
using API.Entities;
using API.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController(DataContext dataContext, ITokenService tokenService) : BaseAPIController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if(await UserNameExists(registerDTO.UserName))
            {
                return BadRequest(registerDTO.UserName + " username already taken");
            }
            using var hma = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = registerDTO.UserName.ToLower(),
                PasswordHash = hma.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hma.Key
            };
            dataContext.Users.Add(user);
            await dataContext.SaveChangesAsync();  
            
            return new UserDTO
            {
                Username = registerDTO.UserName,
                Token = tokenService.CreateToken(user),
            };

        }
        [HttpPost("LogIn")]
        public async Task<ActionResult<UserDTO>> LogIn(LogInDTO logInDTO)
        {
            AppUser user = await dataContext.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == logInDTO.UserName.ToLower());

            if (user == null) return Unauthorized("Invalid UserName");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logInDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)   
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
            return new UserDTO
            {
                Username = logInDTO.UserName,
                Token = tokenService.CreateToken(user)
            };
        }
        private async Task<bool> UserNameExists (string userName)
        {
            return await dataContext.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());
        }
    }
}
