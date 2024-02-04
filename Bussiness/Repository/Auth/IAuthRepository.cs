using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Auth
{
    public interface IAuthRepository
    {
        Task<TblUsers> Register(TblUsers user, string password);
        Task<TblUsers> Login(string userName, string password);
        Task<List<TblUsers>> GetUserList();
        Task<bool> UserExists(string userName);
    }
}
