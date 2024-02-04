using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Dto
{
    public class TblProductsDto
    {
        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        public string? ProductSerialCode { get; set; }

        public int? ProductQuantity { get; set; }

        public string? ProductImage { get; set; }

        public int? InvantoryId { get; set; }
        public int? WareHouseId { get; set; }

        public DateTime? CreateAt { get; set; }
        public List<TblInventory> inventory { get; set; }
        public List<TblWarehouse> wareHouse { get; set; }


    }
}
