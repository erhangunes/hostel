using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Vm
{
    public class ResultVm
    {
        public bool IsSuccess { get; set; }
        public object? ResultSet { get; set; }
        public string? ResponseMessage { get; set; }
    }
}
