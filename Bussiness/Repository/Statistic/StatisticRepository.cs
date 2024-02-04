using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Statistic
{
    public class StatisticRepository : IStatisticRepository
    {
        private readonly HostelDbContext _context;

        public StatisticRepository(HostelDbContext context)
        {
            _context = context;
        }

        public async Task<StatisticModel> statistic()
        {
            StatisticModel model = new StatisticModel
            {
                buildingCount = await _context.TblBuildings.CountAsync(),
                definationCount=await _context.TblDefinations.CountAsync(), 
                generalCount=await _context.TblGeneralcontrols.CountAsync(),
                inventoryCount=await _context.TblInventories.CountAsync(),
                productCount=await _context.TblProducts.CountAsync(),
                roomCount=await _context.TblRooms.CountAsync(),
                usersCount=await _context.Users.CountAsync(),
                wareHouseCount=await _context.TblWarehouses.CountAsync(),
                wareHouseLogCount=await _context.TblWorkhouselogs.CountAsync(),
                workOrderCount=await _context.TblWorkorders.CountAsync(),
            };


            return model;

        }
    }
}
