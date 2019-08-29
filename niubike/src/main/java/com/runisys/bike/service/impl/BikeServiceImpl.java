package com.runisys.bike.service.impl;

import com.runisys.bike.mapper.BikeMapper;
import com.runisys.bike.pojo.Bike;
import com.runisys.bike.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class BikeServiceImpl implements BikeService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BikeMapper bikeMapper;

    @Override
    public void save(Bike bike) {
        bikeMapper.save(bike);
    }

    @Override
    public void save(String bike) {
        mongoTemplate.save(bike, "bike");
    }

    @Override
    public List<Bike> findAll() {
        return mongoTemplate.findAll(Bike.class, "bike");
    }

}
