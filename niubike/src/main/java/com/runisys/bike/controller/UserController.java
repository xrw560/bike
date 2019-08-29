package com.runisys.bike.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Controller
public class UserController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/host")
    @ResponseBody
    public String host(){
        String host = null;
        try {
            host = InetAddress.getLocalHost().getHostName();
            System.out.println(InetAddress.getLocalHost().getHostAddress());
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return host;
    }

}
