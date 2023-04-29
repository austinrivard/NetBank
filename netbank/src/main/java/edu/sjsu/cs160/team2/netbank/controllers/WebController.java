package edu.sjsu.cs160.team2.netbank.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping("/")
    public String viewIndex() {
        System.out.println("[GET: /] returning index homepage");
        return "index.html";
    }
}
