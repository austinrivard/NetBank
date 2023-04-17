package edu.sjsu.cs160.team2.netbank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.sjsu.cs160.team2.netbank.repositories.*;
import edu.sjsu.cs160.team2.netbank.models.*;

@RestController
@RequestMapping("/api")
public class ServiceController {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        List<Account> allAccounts = accountRepository.findAll();
        System.out.println("[GET: /api/accounts] Retrieved accounts: " + allAccounts);
        return allAccounts;
    }

    @PostMapping("/create-user")
    public User postAccount(@RequestBody User user) {


        
        return userRepository.save(user);
    }

    

    // @PostMapping("/addSampleAccount")
    // public Account addSampleAccount() {
    //     Account account = Account.builder()
    //                              .name("Frank")
    //                              .address("123 Main St")
    //                              .dollars(123)
    //                              .cents(55)
    //                              .build();
    //     System.out.println("[POST: /api/addSampleAccount] Created account: " + account);
    //     return accountRepository.save(account);
    // }
}
