using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class TblWorkhouselog
{
    public int WorkHouseLogId { get; set; }

    public int? WareHouseId { get; set; }

    public int? InventoryId { get; set; }

    public int? BuildingId { get; set; }

    public int? RoomId { get; set; }

    public int? ProductId { get; set; }


    public DateTime? CreateAt { get; set; }
}
