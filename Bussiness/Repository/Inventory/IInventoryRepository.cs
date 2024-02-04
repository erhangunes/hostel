using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Inventory
{
    public interface IInventoryRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordExists(string inventory);
        Task<bool> CheckIfRecordIdExists(TblInventory inventory);

        Task<List<TblInventoryDto>> GetInventoryList();
        Task<TblInventory> GetInventoryById(int Id);
    }
}
