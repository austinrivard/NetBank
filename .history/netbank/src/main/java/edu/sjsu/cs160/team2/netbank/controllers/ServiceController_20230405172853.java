package edu.sjsu.cs160.team2.netbank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.sjsu.cs160.team2.netbank.repositories.*;
import edu.sjsu.cs160.team2.netbank.models.*;

import java.util.Collections;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api")
public class ServiceController {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    
    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        List<Account> allAccounts = accountRepository.findAll();
        System.out.println("[GET: /api/accounts] Retrieved accounts: " + allAccounts);
        return allAccounts;
    }

    @PostMapping("/account")
    public Account postAccount(@RequestBody Account account) {
        account.setDollars(0);
        account.setCents(0);
        System.out.println("[POST: /api/account] Created account: " + account);
        transactionRepository.save(new Transaction(1,2,2,Transaction.TransactionType.DEPOSIT,LocalDate.now(),LocalTime.now(),"Desc",0,0));
        return accountRepository.save(account);
    }

    @GetMapping("/account/transactions")
    public List<Transaction> getTransactions(@RequestBody Account account) {
        return transactionRepository.findAllById(Collections.singletonList(account.getId()));
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    /*@PostMapping("/account/deposit")
    public Transaction postDeposit(@RequestBody Transaction transaction){
        
    }


}