using Bussiness.Repository.Room;
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
    public class WorkOrderController : ControllerBase
    {
        private readonly IWorkOrderRepository _workOrderRepository;
        public WorkOrderController(IWorkOrderRepository workOrderRepository)
        {
            _workOrderRepository = workOrderRepository;
        }
        [HttpGet("GetWorkOrderList")]
        [Authorize]
        public async Task<ResultVm> GetWorkOrderList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _workOrderRepository.GetWorkOrderList();
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

        [HttpGet("GetWorkOrderById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetWorkOrderById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _workOrderRepository.GetGetWorkOrderById(Id);
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

        [HttpPost("AddWorkOrder")]
        [Authorize]
        public async Task<ResultVm> AddRoom([FromBody] TblWorkorder workOrder)
        {
            ResultVm result = new ResultVm();

            if (workOrder == null)
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                await _workOrderRepository.Add(workOrder);
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

        [HttpPost("UpdateWorkOrder")]
        [Authorize]
        public async Task<ResultVm> UpdateWorkOrder([FromBody] TblWorkorder workOrder)
        {
            ResultVm result = new ResultVm();

            if (workOrder == null)
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                await _workOrderRepository.Update(workOrder);
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

        [HttpPost("DeleteWorkOrder/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteWorkOrder(int Id)
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
                await _workOrderRepository.Delete(new TblWorkorder { WorkOrderId = Id });
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
