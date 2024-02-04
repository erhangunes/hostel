using Bussiness.Repository.Building;
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
    public class BuildingController : ControllerBase
    {
        private readonly IBuildingRepository _buildingRepository;
        public BuildingController(IBuildingRepository buildingRepository)
        {
            _buildingRepository = buildingRepository;
        }
       
        [HttpGet("GetBuildingList")]
        [Authorize]
        public async Task<ResultVm> GetBuildingList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _buildingRepository.GetBuildingList();
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

        [HttpGet("GetBuildingById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetBuildingById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _buildingRepository.GetBuildingById(Id);
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

        [HttpPost("AddBuilding")]
        [Authorize]
        public async Task<ResultVm> AddBuilding([FromBody] TblBuildingDto buildingDto)
        {
            ResultVm result = new ResultVm();

            if (buildingDto == null || string.IsNullOrEmpty(buildingDto.BuildingName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _buildingRepository.CheckIfRecordExists(buildingDto.BuildingName);

                if (isRecordExists)
                {
                    result.ResponseMessage = "Bu kayıt zaten var!";
                    result.IsSuccess = false;
                }
                else
                {
                    var building = new TblBuilding { BuildingName = buildingDto.BuildingName };
                    await _buildingRepository.Add(building);
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

        [HttpPost("UpdateBuilding")]
        [Authorize]
        public async Task<ResultVm> UpdateBuilding([FromBody] TblBuilding building)
        {
            ResultVm result = new ResultVm();

            if (building == null || string.IsNullOrEmpty(building.BuildingName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _buildingRepository.CheckIfRecordIdExists(building);

                if (isRecordExists)
                {


                    await _buildingRepository.Update(building);
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

        [HttpPost("DeleteBuilding/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteBuilding(int Id)
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
                bool isRecordExists = await _buildingRepository.CheckIfRecordIdExists(new TblBuilding { BuildingId = Id });

                if (isRecordExists)
                {


                    await _buildingRepository.Delete(new TblBuilding { BuildingId = Id });
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
