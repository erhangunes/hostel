using DataAccessLayer.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Repository.Statistic
{
    public interface IStatisticRepository
    {
        Task<StatisticModel> statistic();
    }
}
