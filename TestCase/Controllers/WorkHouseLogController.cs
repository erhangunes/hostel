using Bussiness.Repository.Room;
using Bussiness.Repository.WorkHouseLog;
using Bussiness.Repository.WorkOrder;
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
    public class WorkHouseLogController : ControllerBase
    {
        private readonly IWorkHouseLogRepository _workHouseRepository;
        public WorkHouseLogController(IWorkHouseLogRepository workHouseRepository)
        {
            _workHouseRepository = workHouseRepository;
        }
        [HttpGet("GetWorkHouseLogList")]
        [Authorize]
        public async Task<ResultVm> GetWorkHouseLogList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _workHouseRepository.GetWorkHouseList();
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

        [HttpGet("GetWorkHouseById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetWorkHouseById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _workHouseRepository.GetWorkHouseById(Id);
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

        [HttpPost("AddWorkHouseLog")]
        [Authorize]
        public async Task<ResultVm> AddWorkHouseLog([FromBody] TblWorkhouselog workHouse)
        {
            ResultVm result = new ResultVm();

            if (workHouse == null)
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                await _workHouseRepository.Add(workHouse);
                result.ResponseMessage = "Kayıt Başarılı Bir Şekilde Eklendi.";
                result.IsSuccess = true;

                return result;
            }
            catch (Exception ex)
            {
                result.ResponseMessage = "Kayıt Eklenirken Bir Hata Oluştu!";
                result.IsSuccess = false;
                return result;
            }
        }

        [HttpPost("UpdateWorkHouseLog")]
        [Authorize]
        public async Task<ResultVm> UpdateWorkHouseLog([FromBody] TblWorkhouselog workHouse)
        {
            ResultVm result = new ResultVm();

            if (workHouse == null)
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                await _workHouseRepository.Update(workHouse);
                result.ResponseMessage = "Kayıt Başarılı Bir Şekilde Güncellendi.";
                result.IsSuccess = true;

                return result;
            }
            catch (Exception ex)
            {
                result.ResponseMessage = "Kayıt Güncellenirken Bir Hata Oluştu!";
                result.IsSuccess = false;
                return result;
            }
        }

        [HttpPost("DeleteWorkHouseLog/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteWorkHouseLog(int Id)
        {
            ResultVm result = new ResultVm();

            if (Id == null)
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                await _workHouseRepository.Delete(new TblWorkhouselog { WorkHouseLogId = Id });
                result.ResponseMessage = "Kayıt Başarılı Bir Şekilde Silindi.";
                result.IsSuccess = true;

                return result;
            }
            catch (Exception ex)
            {
                result.ResponseMessage = "Kayıt Silinirken Bir Hata Oluştu!";
                result.IsSuccess = false;
                return result;
            }
        }


    }
}
