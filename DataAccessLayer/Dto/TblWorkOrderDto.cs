using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Dto
{
    public class TblWorkOrderDto
    {
        public int WorkOrderId { get; set; }

        public string? OrderText { get; set; }

        public int? BuildingId { get; set; }

        public int? RoomId { get; set; }

        public int? WareHouseId { get; set; }

        public int? InventoryId { get; set; }

        public int? DefinationId { get; set; }
        public int? ProductId { get; set; }


        public bool? Status { get; set; }

        public List<TblBuilding> building { get; set; }
        public List<TblRoom> room { get; set; }
        public List<TblWarehouse> wareHouse { get; set; }
        public List<TblInventory> inventory { get; set; }
        public List<TblDefination> definations { get; set; }
        public List<TblProduct> product { get; set; }

    }
}
