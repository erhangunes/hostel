using Bussiness.Repository.Defination;
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
    public class DefinationController : ControllerBase
    {
        private readonly IDefinationRepository _definationRepository;
        public DefinationController(IDefinationRepository definationRepository)
        {
            _definationRepository = definationRepository;
        }
        [HttpGet("GetDefinationList")]
        [Authorize]
        public async Task<ResultVm> GetDefinationList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _definationRepository.GetDefinationList();
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

        [HttpGet("GetDefinationById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetDefinationById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _definationRepository.GetDefinationById(Id);
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

        [HttpPost("AddDefination")]
        [Authorize]
        public async Task<ResultVm> AddDefination([FromBody] TblDefination definationDto)
        {
            ResultVm result = new ResultVm();

            if (definationDto == null || string.IsNullOrEmpty(definationDto.DefinationName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _definationRepository.CheckIfRecordExists(definationDto.DefinationName);

                if (isRecordExists)
                {
                    result.ResponseMessage = "Bu kayıt zaten var!";
                    result.IsSuccess = false;
                }
                else
                {
                    await _definationRepository.Add(new TblDefination { DefinationName = definationDto.DefinationName });
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

        [HttpPost("UpdateDefination")]
        [Authorize]
        public async Task<ResultVm> UpdateDefination([FromBody] TblDefination defination)
        {
            ResultVm result = new ResultVm();

            if (defination == null || string.IsNullOrEmpty(defination.DefinationName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _definationRepository.CheckIfRecordIdExists(defination);

                if (isRecordExists)
                {


                    await _definationRepository.Update(defination);
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

        [HttpPost("DeleteDefination/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteDefination(int Id)
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
                bool isRecordExists = await _definationRepository.CheckIfRecordIdExists(new TblDefination { DefinationId = Id });

                if (isRecordExists)
                {


                    await _definationRepository.Delete(new TblDefination { DefinationId = Id });
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
