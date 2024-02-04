using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Defination
{
    public interface IDefinationRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordExists(string defination);
        Task<bool> CheckIfRecordIdExists(TblDefination defination);


        Task<List<TblDefination>> GetDefinationList();
        Task<TblDefination> GetDefinationById(int Id);
    }
}
