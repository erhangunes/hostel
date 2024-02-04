using DataAccessLayer.Dto;
using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class TblWorkorder
{
    public int WorkOrderId { get; set; }

    public string? OrderText { get; set; }

    public int? BuildingId { get; set; }

    public int? RoomId { get; set; }

    public int? WareHouseId { get; set; }

    public int? InventoryId { get; set; }

    public int? DefinationId { get; set; }

    public bool? Status { get; set; }
    public int? ProductId { get; set; }

}
