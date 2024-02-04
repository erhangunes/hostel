using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.WareHouse
{
    public class WareHouseRepository : IWareHouseRepository
    {
        private readonly HostelDbContext _context;

        public WareHouseRepository(HostelDbContext context)
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

        public async Task<bool> CheckIfRecordExists(string wareHouse)
        {
            var result = await _context.TblWarehouses.AnyAsync(x => x.WareHouseName == wareHouse);
            return result;
        }

        public async Task<bool> CheckIfRecordIdExists(TblWarehouse wareHouse)
        {
            var result = await _context.TblWarehouses.AnyAsync(x => x.WareHouseId == wareHouse.WareHouseId);
            return result;
        }

        public async Task<List<TblWarehouse>> GetWareHouseList()
        {
            var result = await _context.TblWarehouses.ToListAsync();
            return result;
        }

        public async Task<TblWarehouse> GetWareHouseById(int Id)
        {
            var result = await _context.TblWarehouses.FindAsync(Id);
            return result;
        }
    }
}
