using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.WorkHouseLog
{
    public interface IWorkHouseLogRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordIdExists(TblWorkhouselog workHouse);


        Task<List<TblWorkHouseLogDto>> GetWorkHouseList();
        Task<TblWorkhouselog> GetWorkHouseById(int Id);
    }
}
