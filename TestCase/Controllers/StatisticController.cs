using Bussiness.Repository.Building;
using Bussiness.Repository.Statistic;
using Bussiness.Vm;
using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TestCase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticRepository _statisticRepository;
        public StatisticController(IStatisticRepository statisticRepository)
        {
            _statisticRepository = statisticRepository;
        }
       
        [HttpGet("GetStatistic")]
        [Authorize]
        public async Task<ResultVm> GetStatistic()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _statisticRepository.statistic();
                res.ResultSet = result;
                res.ResponseMessage = "Kayıt Başarılı Bir Şekilde Listelendi.";
                res.IsSuccess = true;
                return res;

            }
            catch (Exception)
            {
                res.ResultSet = "";
                res.ResponseMessage = "Kayıt Listelenirken Bir Hata Oluştu!";
                res.IsSuccess = false;
                return res;
            }



        }

      

    }
}
