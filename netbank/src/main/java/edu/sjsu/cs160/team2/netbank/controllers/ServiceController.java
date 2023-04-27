package edu.sjsu.cs160.team2.netbank.controllers;

import java.math.BigDecimal;
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
    @GetMapping("/account")
    public List<Account> getAccounts() {
        List<Account> allAccounts = accountRepository.findAll();
        System.out.println("[GET: /api/accounts] Retrieved accounts: " + allAccounts);
        return allAccounts;
    }
    
    @PostMapping("/account")
    public Account postAccount(@RequestBody Account account) {
        User lookupUser = userRepository.findById(account.getUser().getId()).get();
        account.setUser(lookupUser);
        return accountRepository.save(account);
    }

    @GetMapping("/user")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // TODO: restrict to admins only
    @PostMapping("/user")
    public User postUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/account/{accountNumber}/transaction")
    public List<Transaction> getTransactions(@PathVariable String accountNumber) {
        return transactionRepository.findAllByAccountNumber(accountNumber);
    }

    @PostMapping("/account/{accountNumber}/transaction")
    public Transaction postTransaction(@PathVariable String accountNumber, @RequestBody Transaction transaction) {
        transaction.setAccount(accountRepository.findById(accountNumber).get());
        return transactionRepository.save(transaction);
    }

    @PostMapping("/processTransfer")
    public Account processTransfer(@RequestBody Account fromAccount, @RequestBody Account toAccount, @RequestBody BigDecimal amount) {
        System.out.println("Processing transfer"); // TODO
        System.out.println(fromAccount);
        System.out.println(toAccount);
        System.out.println(amount);
        return toAccount;
    }
}
