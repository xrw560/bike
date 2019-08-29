package com.runisys.bike.service;

import com.runisys.bike.pojo.Bike;

import java.util.List;

public interface BikeService {

    public void save(Bike bike);

    public void save(String bike);

    public List<Bike> findAll();
}
