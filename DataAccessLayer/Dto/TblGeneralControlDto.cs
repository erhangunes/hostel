using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Dto
{
    public class TblGeneralControlDto
    {
        public int GeneralControld { get; set; }

        public int? BuildingId { get; set; }

        public int? RoomId { get; set; }

        public int? WareHouseId { get; set; }

        public List<TblBuilding> building { get; set; }
        public List<TblRoom> room { get; set; }
        public List<TblWarehouse> wareHouse { get; set; }
  

    }
}
