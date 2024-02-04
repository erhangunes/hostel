using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Building
{
    public interface IBuildingRepository
    {
        Task Add<T>(T entity) where T : class;
        Task Update<T>(T entity) where T : class;
        Task Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<bool> CheckIfRecordExists(string building);
        Task<bool> CheckIfRecordIdExists(TblBuilding building);


        Task<List<TblBuilding>> GetBuildingList();
        Task<TblBuilding> GetBuildingById(int Id);

    }
}
