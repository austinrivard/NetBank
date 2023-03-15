package edu.sjsu.cs160.team2.netbank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.sjsu.cs160.team2.netbank.repositories.*;
import edu.sjsu.cs160.team2.netbank.models.*;

@Controller
public class WebController {
    @GetMapping("/")
    public String viewIndex() {
        System.out.println("[GET: /] returning index homepage");
        return "index.html";
    }
}
