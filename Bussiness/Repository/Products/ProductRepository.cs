using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Products
{
    public class ProductRepository : IProductsRepository
    {
        private readonly HostelDbContext _context;

        public ProductRepository(HostelDbContext context)
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

        public async Task<bool> CheckIfRecordExists(string product)
        {
            var result = await _context.TblProducts.AnyAsync(x => x.ProductName == product);
            return result;
        }

        public async Task<bool> CheckIfRecordIdExists(TblProduct product)
        {
            var result = await _context.TblProducts.AnyAsync(x => x.ProductId == product.ProductId);
            return result;
        }

        public async Task<List<TblProductsDto>> GetProductList()
        {
            var product = await _context.TblProducts.ToListAsync();
            List<TblProductsDto> productList = new List<TblProductsDto>();

            if (product != null)
            {
                foreach (var item in product)
                {
                    List<TblInventory> inventory = await _context.TblInventories.Where(i => i.InventoryId == item.InvantoryId).ToListAsync();
                    foreach (var itemInventory in inventory)
                    {
                        TblProductsDto productDto = new TblProductsDto
                        {
                            ProductId = item.ProductId,
                            ProductName = item.ProductName,
                            ProductSerialCode = item.ProductSerialCode,
                            ProductQuantity = item.ProductQuantity,
                            InvantoryId = item.InvantoryId,
                            CreateAt = item.CreateAt,
                            inventory = inventory,
                            wareHouse = await _context.TblWarehouses.Where(w => w.WareHouseId == itemInventory.WareHouseId).ToListAsync(),
                            WareHouseId = itemInventory.WareHouseId


                        };
                        productList.Add(productDto);
                    }



                }

                return productList;
            }

            return productList;
        }

        public async Task<TblProduct> GetProductById(int Id)
        {
            var result = await _context.TblProducts.FirstOrDefaultAsync(x => x.ProductId == Id);
            return result;
        }
    }
}
