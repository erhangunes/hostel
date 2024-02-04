using Bussiness.Repository.Products;
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
    public class ProductController : ControllerBase
    {
        private readonly IProductsRepository _productRepository;
        public ProductController(IProductsRepository productRepository)
        {
            _productRepository = productRepository;
        }
        [HttpGet("GetProductList")]
        [Authorize]
        public async Task<ResultVm> GetProductList()
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _productRepository.GetProductList();
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

        [HttpGet("GetProductListById/{Id}")]
        [Authorize]
        public async Task<ResultVm> GetProductListById(int Id)
        {
            ResultVm res = new ResultVm();
            try
            {
                var result = await _productRepository.GetProductById(Id);
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

        [HttpPost("AddProduct")]
        [Authorize]
        public async Task<ResultVm> AddProduct([FromBody] TblProduct product)
        {
            ResultVm result = new ResultVm();

            if (product == null || string.IsNullOrEmpty(product.ProductName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _productRepository.CheckIfRecordExists(product.ProductName);

                if (isRecordExists)
                {
                    result.ResponseMessage = "Bu kayıt zaten var!";
                    result.IsSuccess = false;
                }
                else
                {


                    await _productRepository.Add(product);
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

        [HttpPost("UpdateProduct")]
        [Authorize]
        public async Task<ResultVm> UpdateProduct([FromBody] TblProduct product)
        {
            ResultVm result = new ResultVm();

            if (product == null || string.IsNullOrEmpty(product.ProductName))
            {
                result.ResponseMessage = "Boş İçerik Gönderilemez!";
                result.IsSuccess = false;
                return result;
            }

            try
            {
                bool isRecordExists = await _productRepository.CheckIfRecordIdExists(product);

                if (isRecordExists)
                {


                    await _productRepository.Update(product);
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

        [HttpPost("DeleteProduct/{Id}")]
        [Authorize]
        public async Task<ResultVm> DeleteProduct(int Id)
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
                bool isRecordExists = await _productRepository.CheckIfRecordIdExists(new TblProduct { ProductId = Id });

                if (isRecordExists)
                {


                    await _productRepository.Delete(new TblProduct { ProductId = Id });
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
