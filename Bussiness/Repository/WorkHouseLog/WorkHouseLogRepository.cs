using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.WorkHouseLog
{
    public class WorkHouseLogRepository : IWorkHouseLogRepository
    {
        private readonly HostelDbContext _context;

        public WorkHouseLogRepository(HostelDbContext context)
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

        public async Task<bool> CheckIfRecordIdExists(TblWorkhouselog workHouse)
        {
            var result = await _context.TblWorkhouselogs.AnyAsync(x => x.WorkHouseLogId == workHouse.WorkHouseLogId);
            return result;
        }

        public async Task<List<TblWorkHouseLogDto>> GetWorkHouseList()
        {

            var workHouse = await _context.TblWorkhouselogs.ToListAsync();
            List<TblWorkHouseLogDto> workHouseList = new List<TblWorkHouseLogDto>();

            if (workHouse != null)
            {
                foreach (var workHouseItem in workHouse)
                {


                    TblWorkHouseLogDto workHouseLogDto = new TblWorkHouseLogDto
                    {
                        WorkHouseLogId = workHouseItem.WorkHouseLogId,
                        ProductId=workHouseItem.ProductId,
                        BuildingId = workHouseItem.BuildingId,
                        RoomId = workHouseItem.RoomId,
                        WareHouseId = workHouseItem.WareHouseId,
                        InventoryId = workHouseItem.InventoryId,
                        CreateAt = workHouseItem.CreateAt,
                        building = await _context.TblBuildings.Where(b => b.BuildingId == workHouseItem.BuildingId).ToListAsync(),
                        room = await _context.TblRooms.Where(r => r.RoomId == workHouseItem.RoomId).ToListAsync(),
                        wareHouse = await _context.TblWarehouses.Where(w => w.WareHouseId == workHouseItem.WareHouseId).ToListAsync(),
                        inventory = await _context.TblInventories.Where(w => w.WareHouseId == workHouseItem.WareHouseId).ToListAsync(),
                        products  = await _context.TblProducts.Where(w => w.ProductId == workHouseItem.ProductId).ToListAsync(),

                    };

                    workHouseList.Add(workHouseLogDto);
                }

                return workHouseList;
            }

            return workHouseList;
        }

        public async Task<TblWorkhouselog> GetWorkHouseById(int Id)
        {
            var result = await _context.TblWorkhouselogs.FirstOrDefaultAsync(x => x.WorkHouseLogId == Id);
            return result;
        }
    }
}
