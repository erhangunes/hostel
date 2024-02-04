using Bussiness.Repository.Room;
using Bussiness.Repository.WareHouse;
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
    public class WareHouseController : ControllerBase
    {
        private readonly IWareHouseRepository _wareHouseRepository;
        public WareHouseController(IWareHouseRepository wareHouseRepository)
        {
            _wareHouseRepository = wareHouseRepository;
        }
        [HttpGet("GetWareHouseList")]
        [Authorize]
        public async Task<ResultVm> GetWareHouseList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _wareHouseRepository.GetWareHouseList();
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

        [HttpGet("GetWareHouseById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetWareHouseById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _wareHouseRepository.GetWareHouseById(Id);
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

        [HttpPost("AddWareHouse")]
        [Authorize]
        public async Task<ResultVm> AddWareHouse([FromBody] TblWarehouse wareHouseDto)
        {
            ResultVm result = new ResultVm();

            if (wareHouseDto == null || string.IsNullOrEmpty(wareHouseDto.WareHouseName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _wareHouseRepository.CheckIfRecordExists(wareHouseDto.WareHouseName);

                if (isRecordExists)
                {
                    result.ResponseMessage = "Bu kayıt zaten var!";
                    result.IsSuccess = false;
                }
                else
                {
                    await _wareHouseRepository.Add(new TblWarehouse { WareHouseName = wareHouseDto.WareHouseName });
                    result.ResponseMessage = "Kayıt Başarılı Bir Şekilde Eklendi.";
                    result.IsSuccess = true;
                }

                return result;
            }
            catch (Exception ex)
            {
                result.ResponseMessage = "Kayıt Eklenirken Bir Hata Oluştu!";
                result.IsSuccess = false;
                return result;
            }
        }

        [HttpPost("UpdateWareHouse")]
        [Authorize]
        public async Task<ResultVm> UpdateWareHouse([FromBody] TblWarehouse wareHouse)
        {
            ResultVm result = new ResultVm();

            if (wareHouse == null || string.IsNullOrEmpty(wareHouse.WareHouseName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _wareHouseRepository.CheckIfRecordIdExists(wareHouse);

                if (isRecordExists)
                {


                    await _wareHouseRepository.Update(wareHouse);
                    result.ResponseMessage = "Kayıt Başarılı Bir Şekilde Güncellendi.";
                    result.IsSuccess = true;

                }
                else
                {
                    result.ResponseMessage = "Böyle Bir Kayıt Bulanamadı!";
                    result.IsSuccess = false;
                }

                return result;
            }
            catch (Exception ex)
            {
                result.ResponseMessage = "Kayıt Güncellenirken Bir Hata Oluştu!";
                result.IsSuccess = false;
                return result;
            }
        }

        [HttpPost("DeleteWareHouse/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteWareHouse(int Id)
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
                bool isRecordExists = await _wareHouseRepository.CheckIfRecordIdExists(new TblWarehouse { WareHouseId = Id });

                if (isRecordExists)
                {


                    await _wareHouseRepository.Delete(new TblWarehouse { WareHouseId = Id });
                    result.ResponseMessage = "Kayıt Başarılı Bir Şekilde Silindi.";
                    result.IsSuccess = true;

                }
                else
                {
                    result.ResponseMessage = "Böyle Bir Kayıt Bulanamadı!";
                    result.IsSuccess = false;
                }

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
