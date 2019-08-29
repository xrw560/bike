package com.runisys.bike.mapper;

import com.runisys.bike.pojo.Bike;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BikeMapper {

    public void save(Bike bike);
}
