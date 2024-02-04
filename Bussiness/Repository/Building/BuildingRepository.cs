using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Building
{
    public class BuildingRepository : IBuildingRepository
    {
        private readonly HostelDbContext _context;
        public BuildingRepository(HostelDbContext context)
        {
            _context = context;
        }
        public async Task Add<T>(T entity) where T : class
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
        }
        public async Task Update<T>(T entity) where T : class
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task Delete<T>(T entity) where T : class
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;

        }

        public async Task<TblBuilding> GetBuildingById(int Id)
        {
            var result = await _context.TblBuildings.FindAsync(Id);
            return result;

        }

        public async Task<List<TblBuilding>> GetBuildingList()
        {
            var result = await _context.TblBuildings.ToListAsync();
            return result;
        }

        public async Task<bool> CheckIfRecordExists(string building)
        {

            var result = await _context.TblBuildings.AnyAsync(x => x.BuildingName == building);
            return result;
        }

        public async Task<bool> CheckIfRecordIdExists(TblBuilding building)
        {
            var result = await _context.TblBuildings.AnyAsync(x => x.BuildingId == building.BuildingId);
            return result;
        }
    }
}
