using Bussiness.Repository.Auth;
using Bussiness.Vm;
using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TestCase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _authRepository;
        private IConfiguration _configuration;
        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<ResultVm> Register([FromBody] TblUsersDto userForRegisterDto)
        {
            ResultVm res = new ResultVm();

            if (await _authRepository.UserExists(userForRegisterDto.UserName))
            {
                res.ResponseMessage = "Kullanıcı adı mevcut.";
                res.IsSuccess = false;
                return res;
            }

            if (!ModelState.IsValid)
            {
                res.ResponseMessage = "Geçersiz model durumu.";
                res.IsSuccess = false;
                return res;
            }

            var userToCreate = new TblUsers
            {
                Username = userForRegisterDto.UserName,
            };

            var createdUser = await _authRepository.Register(userToCreate, userForRegisterDto.Password);

            res.ResponseMessage = "Kullanıcı başarıyla oluşturuldu.";
            res.IsSuccess = true;
            res.ResultSet = createdUser;
            return res;
        }

        [HttpPost("login")]
        public async Task<ResultVm> Login([FromBody] TblUsersDto userForLoginDto)
        {
            ResultVm res = new ResultVm();

            var user = await _authRepository.Login(userForLoginDto.UserName, userForLoginDto.Password);
            if (user == null)
            {
                res.ResponseMessage = "Kullanıcı adı veya şifre hatalı.";
                res.IsSuccess = false;
                return res;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenSecret = _configuration.GetSection("AppSettings:Secret").Value;
            var key = Encoding.ASCII.GetBytes(tokenSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddMinutes(30), // UTC zamanını kullanmak daha iyi bir uygulama yapısı sağlar.
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            res.ResponseMessage = "Giriş başarılı.";
            res.IsSuccess = true;
            res.ResultSet = new {token= tokenString,userName= userForLoginDto.UserName };
            return res;
        }

        [HttpGet("GetUsersList")]
        [Authorize]
        public async Task<ResultVm> GetUsersList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _authRepository.GetUserList();
                res.ResultSet = result;
                res.ResponseMessage = "Kayıt Başarılı Bir Şekilde Listelendi.";
                res.IsSuccess = true;
                return res;

            }
            catch (Exception)
            {
                res.ResultSet = "";
                res.ResponseMessage = "Kayıt Listelenirken Bir Hata Oluştu!";
                res.IsSuccess = false;
                return res;
            }



        }
    }
}
