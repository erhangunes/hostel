using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class TblInventory
{
    public int InventoryId { get; set; }

    public string? InventoryName { get; set; }

    public int? WareHouseId { get; set; }
}
