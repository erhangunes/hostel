using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.GeneralControl
{
    public interface IGeneralControlRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordIdExists(TblGeneralcontrol general);
        Task<bool> CheckIfRecordRoomIdExists(TblGeneralcontrol general);

        Task<List<TblGeneralControlDto>> GetGeneralControlList();
        Task<TblGeneralcontrol> GetGeneralControlById(int Id);
    }
}
