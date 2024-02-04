using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Dto
{
    public class StatisticModel
    {
        public int usersCount { get; set; }
        public int buildingCount { get; set; }
        public int definationCount { get; set; }
        public int generalCount { get; set; }
        public int inventoryCount { get; set; }
        public int productCount { get; set; }
        public int roomCount { get; set; }
        public int wareHouseCount { get; set; }
        public int wareHouseLogCount { get; set; }
        public int workOrderCount { get; set; }

    }
}
