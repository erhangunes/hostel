using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class TblProduct
{
    public int ProductId { get; set; }

    public string? ProductName { get; set; }

    public string? ProductSerialCode { get; set; }

    public int? ProductQuantity { get; set; }
    public int? InvantoryId { get; set; }

    public DateTime? CreateAt { get; set; }
}
