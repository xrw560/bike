package com.runisys.bike.service.impl;

import com.runisys.bike.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class LogServiceImpl implements LogService {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void save(String log) {
        mongoTemplate.save(log, "logs");
    }
}
