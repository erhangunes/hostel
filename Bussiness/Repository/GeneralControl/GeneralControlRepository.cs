using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.GeneralControl
{
    public class GeneralControlRepository : IGeneralControlRepository
    {
        private readonly HostelDbContext _context;
        public GeneralControlRepository(HostelDbContext context)
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

        public async Task<bool> CheckIfRecordIdExists(TblGeneralcontrol general)
        {
            var result = await _context.TblGeneralcontrols.AnyAsync(x => x.GeneralControld == general.GeneralControld);
            return result;
        }

        public async Task<bool> CheckIfRecordRoomIdExists(TblGeneralcontrol general)
        {
            var result = await _context.TblGeneralcontrols.AnyAsync(x => x.RoomId == general.RoomId);
            return result;
        }

        public async Task<List<TblGeneralControlDto>> GetGeneralControlList()
        {

            var generalControl = await _context.TblGeneralcontrols.ToListAsync();
            List<TblGeneralControlDto> generalControlList = new List<TblGeneralControlDto>();

            if (generalControl != null)
            {
                foreach (var generalControlItem in generalControl)
                {

                    TblGeneralControlDto generalControlDto = new TblGeneralControlDto
                    {
                        GeneralControld= generalControlItem.GeneralControld,
                        BuildingId = generalControlItem.BuildingId,
                        RoomId = generalControlItem.RoomId,
                        WareHouseId = generalControlItem.WareHouseId,

                        building = await _context.TblBuildings.Where(b => b.BuildingId == generalControlItem.BuildingId).ToListAsync(),
                        room = await _context.TblRooms.Where(r => r.RoomId == generalControlItem.RoomId).ToListAsync(),
                        wareHouse = await _context.TblWarehouses.Where(w => w.WareHouseId == generalControlItem.WareHouseId).ToListAsync(),

                    };

                    generalControlList.Add(generalControlDto);
                }

                return generalControlList;
            }

            return generalControlList;
        }

        public async Task<TblGeneralcontrol> GetGeneralControlById(int Id)
        {
            var result = await _context.TblGeneralcontrols.SingleOrDefaultAsync(x => x.GeneralControld == Id);
            return result;

        }

     
    }
}
