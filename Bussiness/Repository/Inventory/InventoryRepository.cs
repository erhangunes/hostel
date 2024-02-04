using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Inventory
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly HostelDbContext _context;

        public InventoryRepository(HostelDbContext context)
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

        public async Task<bool> CheckIfRecordExists(string inventory)
        {
            var result = await _context.TblInventories.AnyAsync(x => x.InventoryName == inventory);
            return result;
        }

        public async Task<bool> CheckIfRecordIdExists(TblInventory inventory)
        {
            var result = await _context.TblInventories.AnyAsync(x => x.InventoryId == inventory.InventoryId);
            return result;
        }

        public async Task<List<TblInventoryDto>> GetInventoryList()
        {
            var inventory = await _context.TblInventories.ToListAsync();
            List<TblInventoryDto> inventoryList = new List<TblInventoryDto>();

            if (inventory != null)
            {
                foreach (var item in inventory)
                {
                    List<TblWarehouse> wareHouse = await _context.TblWarehouses.Where(i => i.WareHouseId == item.WareHouseId).ToListAsync();

                    TblInventoryDto inventoryDto = new TblInventoryDto
                    {InventoryId=item.InventoryId,  
                        InventoryName = item.InventoryName,
                        WareHouseId = item.WareHouseId,
                        wareHouse = wareHouse
                    };

                    inventoryList.Add(inventoryDto);
                }

                return inventoryList;
            }

            return inventoryList;
        }

        public async Task<TblInventory> GetInventoryById(int Id)
        {
            var result = await _context.TblInventories.FirstOrDefaultAsync(x => x.InventoryId == Id);
            return result;
        }
    }
}
