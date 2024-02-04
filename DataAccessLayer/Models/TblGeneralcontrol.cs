using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class TblGeneralcontrol
{
    public int GeneralControld { get; set; }

    public int? BuildingId { get; set; }

    public int? RoomId { get; set; }

    public int? WareHouseId { get; set; }
}
