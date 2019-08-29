package com.runisys.bike.controller;

import com.runisys.bike.pojo.Bike;
import com.runisys.bike.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class BikeController {

    //    @PostMapping("/bike")
//    @ResponseBody
//    public String getById(@RequestBody String data) {
//        System.out.println(data);
//        return "succ";
//    }
    @Autowired
    private BikeService bikeService;


    @GetMapping("/bike")
    @ResponseBody
    public String getById(Bike bike) {
        bikeService.save(bike);
        return "success";
    }

    @PostMapping("/bike")
    @ResponseBody
    public String save(@RequestBody String bike) {
        bikeService.save(bike);
        return "success";
    }

    @GetMapping("/bikes")
    @ResponseBody
    public List<Bike> findAll(){
        List<Bike> bikes = bikeService.findAll();
        return bikes;
    }

    //先跳转到视图页面
    @GetMapping("/bike_list")
    public String toList(){
        return "bike/list";
    }

}
