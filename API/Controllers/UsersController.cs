using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController(DataContext context) : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() {
            var users = await context.Users.ToListAsync();

            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUsers(int id) {
            var user = await context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();

            if(user == null)
                return NotFound();

            return Ok(user);
        }
    }
}
