using AutoMapper;
using DataAccessLayer.Dto;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Helpers
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            MapModels();
        }
        public void MapModels()
        {
            CreateMap<TblBuildingDto, TblBuilding>().ReverseMap();

        }
    }
}
