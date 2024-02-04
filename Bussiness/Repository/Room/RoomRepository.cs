using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Room
{
    public class RoomRepository : IRoomRepository
    {

        private readonly HostelDbContext _context;
        public RoomRepository(HostelDbContext context)
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

        public async Task<bool> CheckIfRecordIdExists(TblRoom room)
        {
            var result = await _context.TblRooms.AnyAsync(x => x.RoomId == room.RoomId);
            return result;
        }


        public async Task<TblRoom> GetRoomById(int Id)
        {
            var result = await _context.TblRooms.FindAsync(Id);
            return result;
        }

        public async Task<List<TblRoom>> GetRoomList()
        {
            var result = await _context.TblRooms.ToListAsync();
            return result;
        }

        public async Task<bool> CheckIfRecordExists(string room)
        {
            var result = await _context.TblRooms.AnyAsync(x => x.RoomName == room);
            return result;
        }
    }
}
