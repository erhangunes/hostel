using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Room
{
    public interface IRoomRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordExists(string room);
        Task<bool> CheckIfRecordIdExists(TblRoom room);


        Task<List<TblRoom>> GetRoomList();
        Task<TblRoom> GetRoomById(int Id);
    }
}
