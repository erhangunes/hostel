using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.WorkOrder
{
    public class WorkOrderRepository : IWorkOrderRepository
    {
        private readonly HostelDbContext _context;

        public WorkOrderRepository(HostelDbContext context)
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

        public async Task<List<TblWorkOrderDto>> GetWorkOrderList()
        {
            var workOrders = await _context.TblWorkorders.ToListAsync();
            List<TblWorkOrderDto> workOrderList = new List<TblWorkOrderDto>();

            if (workOrders != null)
            {
                foreach (var workOrder in workOrders)
                {
                    List<TblInventory> inventory = await _context.TblInventories.Where(i => i.InventoryId == workOrder.InventoryId).ToListAsync();

                    TblWorkOrderDto workOrderDto = new TblWorkOrderDto
                    {WorkOrderId=workOrder.WorkOrderId,
                    ProductId=workOrder.ProductId,
                        OrderText = workOrder.OrderText,
                        BuildingId = workOrder.BuildingId,
                        RoomId = workOrder.RoomId,
                        WareHouseId = workOrder.WareHouseId,
                        InventoryId = workOrder.InventoryId,
                        DefinationId = workOrder.DefinationId,
                        Status = workOrder.Status,
                        building = await _context.TblBuildings.Where(b => b.BuildingId == workOrder.BuildingId).ToListAsync(),
                        room = await _context.TblRooms.Where(r => r.RoomId == workOrder.RoomId).ToListAsync(),
                        wareHouse = await _context.TblWarehouses.Where(w => w.WareHouseId == workOrder.WareHouseId).ToListAsync(),
                        inventory = inventory,
                        definations = await _context.TblDefinations.Where(d => d.DefinationId == workOrder.DefinationId).ToListAsync(),
                         product = await _context.TblProducts.Where(d => d.ProductId == workOrder.ProductId).ToListAsync()
                    };

                    workOrderList.Add(workOrderDto);
                }

                return workOrderList;
            }

            return workOrderList;
        }

        public async Task<TblWorkorder> GetGetWorkOrderById(int Id)
        {
            var result = await _context.TblWorkorders.FirstOrDefaultAsync(x => x.WorkOrderId == Id);
            return result;
        }
    }
}
