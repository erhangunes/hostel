using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Dto
{
    public class TblInventoryDto
    {
        public int InventoryId { get; set; }

        public string? InventoryName { get; set; }

        public int? WareHouseId { get; set; }
        public List<TblWarehouse> wareHouse { get; set; }
    }
}
