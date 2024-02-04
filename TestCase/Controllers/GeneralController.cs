using Bussiness.Repository.GeneralControl;
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
    public class GeneralController : ControllerBase
    {
        private readonly IGeneralControlRepository _generalControlRepository;
        public GeneralController(IGeneralControlRepository generalControlRepository)
        {
            _generalControlRepository = generalControlRepository;
        }
        [HttpGet("GetGeneralControlList")]
        [Authorize]
        public async Task<ResultVm> GetGeneralControlList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _generalControlRepository.GetGeneralControlList();
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

        [HttpGet("GetGeneralControlById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetGeneralControlById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _generalControlRepository.GetGeneralControlById(Id);
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

        [HttpPost("AddGeneralControl")]
        [Authorize]
        public async Task<ResultVm> AddGeneralControl([FromBody] TblGeneralcontrol general)
        {
            ResultVm result = new ResultVm();

            if (general == null)
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _generalControlRepository.CheckIfRecordRoomIdExists(new TblGeneralcontrol { RoomId = general.RoomId });

                if (isRecordExists)
                {
                    result.ResponseMessage = "Bu Odayı Daha Fazla Ekleyemezsin!";
                    result.IsSuccess = false;
                }
                else
                {
                    await _generalControlRepository.Add(general);
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

        [HttpPost("UpdateGeneralControl")]
        [Authorize]
        public async Task<ResultVm> UpdateGeneralControl([FromBody] TblGeneralcontrol general)
        {
            ResultVm result = new ResultVm();

            if (general == null)
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                await _generalControlRepository.Update(general);
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

        [HttpPost("DeleteGeneralControl/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteGeneralControl(int Id)
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
                await _generalControlRepository.Delete(new TblGeneralcontrol { GeneralControld = Id });
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
