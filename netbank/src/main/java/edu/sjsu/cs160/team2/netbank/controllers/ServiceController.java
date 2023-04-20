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

    @Autowired
    private TransactionRepository transactionRepository;
    
    // TODO: restrict to admins only or only retrieve user's accounts
    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        List<Account> allAccounts = accountRepository.findAll();
        System.out.println("[GET: /api/accounts] Retrieved accounts: " + allAccounts);
        return allAccounts;
    }

    // TODO: restrict to admins only
    @PostMapping("/create-user")
    public User postUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/account/{id}/transaction")
    public List<Transaction> getTransactions(@PathVariable String id) {
        return transactionRepository.findAllByAccountId(id);
    }

    @PostMapping("/account/{id}/transaction")
    public Transaction postTransaction(@PathVariable String id, @RequestBody Transaction transaction) {
        transaction.setAccount(accountRepository.findById(id).get());
        return transactionRepository.save(transaction);
    }
}
