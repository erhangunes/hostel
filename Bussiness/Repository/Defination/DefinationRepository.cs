using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Defination
{
    public class DefinationRepository : IDefinationRepository
    {
        private readonly HostelDbContext _context;

        public DefinationRepository(HostelDbContext context)
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

        public async Task<bool> CheckIfRecordExists(string defination)
        {
            var result = await _context.TblDefinations.AnyAsync(x => x.DefinationName == defination);
            return result;
        }

        public async Task<bool> CheckIfRecordIdExists(TblDefination defination)
        {
            var result = await _context.TblDefinations.AnyAsync(x => x.DefinationId == defination.DefinationId);
            return result;

        }

        public async Task<List<TblDefination>> GetDefinationList()
        {
            var result = await _context.TblDefinations.ToListAsync();
            return result;
        }

        public async Task<TblDefination> GetDefinationById(int Id)
        {
            var result = await _context.TblDefinations.FindAsync(Id);
            return result;
        }
    }
}
