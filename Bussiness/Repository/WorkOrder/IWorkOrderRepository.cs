using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.WorkOrder
{
    public interface IWorkOrderRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
   
        Task<List<TblWorkOrderDto>> GetWorkOrderList();
        Task<TblWorkorder> GetGetWorkOrderById(int Id);
    }
}
