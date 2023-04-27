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
        return accountRepository.save(account);
    }

    @GetMapping("/accounts/transactions")
    public List<Transaction> getTransactions(@RequestBody Account account) {
        return transactionRepository.findAllByUserId(account.getId());
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
