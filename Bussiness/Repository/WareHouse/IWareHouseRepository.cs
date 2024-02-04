using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.WareHouse
{
    public interface IWareHouseRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordExists(string wareHouse);
        Task<bool> CheckIfRecordIdExists(TblWarehouse wareHouse);


        Task<List<TblWarehouse>> GetWareHouseList();
        Task<TblWarehouse> GetWareHouseById(int Id);
    }
}
