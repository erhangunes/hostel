using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Products
{
    public interface IProductsRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordExists(string product);
        Task<bool> CheckIfRecordIdExists(TblProduct product);
        Task<List<TblProductsDto>> GetProductList();
        Task<TblProduct> GetProductById(int Id);
    }
}
