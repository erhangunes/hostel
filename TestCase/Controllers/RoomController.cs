using Bussiness.Repository.Room;
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
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository _roomRepository;
        public RoomController(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }
        [HttpGet("GetRoomList")]
        [Authorize]
        public async Task<ResultVm> GetRoomList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _roomRepository.GetRoomList();
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

        [HttpGet("GetRoomById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetRoomById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _roomRepository.GetRoomById(Id);
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

        [HttpPost("AddRoom")]
        [Authorize]
        public async Task<ResultVm> AddRoom([FromBody] TblRoomDto roomDto)
        {
            ResultVm result = new ResultVm();

            if (roomDto == null || string.IsNullOrEmpty(roomDto.roomName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _roomRepository.CheckIfRecordExists(roomDto.roomName);

                if (isRecordExists)
                {
                    result.ResponseMessage = "Bu kayıt zaten var!";
                    result.IsSuccess = false;
                }
                else
                {
                    await _roomRepository.Add(new TblRoom { RoomName = roomDto.roomName });
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

        [HttpPost("UpdateRoom")]
        [Authorize]
        public async Task<ResultVm> UpdateRoom([FromBody] TblRoom room)
        {
            ResultVm result = new ResultVm();

            if (room == null || string.IsNullOrEmpty(room.RoomName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _roomRepository.CheckIfRecordIdExists(room);

                if (isRecordExists)
                {


                    await _roomRepository.Update(room);
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

        [HttpPost("DeleteRoom/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteRoom(int Id)
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
                bool isRecordExists = await _roomRepository.CheckIfRecordIdExists(new TblRoom { RoomId = Id });

                if (isRecordExists)
                {


                    await _roomRepository.Delete(new TblRoom { RoomId = Id });
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
