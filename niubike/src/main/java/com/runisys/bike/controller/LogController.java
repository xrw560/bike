package com.runisys.bike.controller;

import com.runisys.bike.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/log")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping("ready")
    @ResponseBody
    public String ready(@RequestBody String log) {
        logService.save(log);
        return "success";
    }


}
