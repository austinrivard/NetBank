package edu.sjsu.cs160.team2.netbank.controllers;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import edu.sjsu.cs160.team2.netbank.repositories.*;
import edu.sjsu.cs160.team2.netbank.util.TransferArgs;
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

    @Autowired
    private AccountController accountController;

    @Autowired
    private CheckRecordRepository checkRecordRepository;
    
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
    public Transaction processTransfer(@RequestBody TransferArgs transferArgs) {
        Account fromAccount = accountRepository.findById(transferArgs.fromAccount.getNumber()).get();
        Account toAccount = accountRepository.findById(transferArgs.toAccount.getNumber()).get();
        BigDecimal amount = transferArgs.amount;

        return accountController.executeTransfer(fromAccount, toAccount, amount);
    }

    @PostMapping(path="/depositCheck", consumes={"multipart/form-data"})
    public Transaction depositCheck(
        @RequestPart("account") Account account,
        @RequestPart("amount") BigDecimal amount,
        @RequestPart("date") LocalDate date,
        @RequestPart("imageFront") MultipartFile imageFront,
        @RequestPart("imageBack") MultipartFile imageBack
    ) throws IOException {
        if (amount.compareTo(BigDecimal.ZERO) != 1) throw new IllegalArgumentException("Amount must be non-negative");
        
        account = accountRepository.findById(account.getNumber()).get();

        Transaction transaction = accountController.updateBalance(account, amount);
        transaction.setDescription("Mobile Check Deposit");
        transaction.setDate(date);

        CheckRecord checkRecord = CheckRecord
            .builder()
            .transaction(transaction)
            .imageFront(imageFront.getBytes())
            .imageBack(imageBack.getBytes())
            .build();
        checkRecordRepository.save(checkRecord); // save image data

        return transactionRepository.save(transaction);
    }

    @GetMapping(path="/checkRecord/{transactionId}/front", produces="image/jpg")
    public byte[] getCheckImageFront(@PathVariable("transactionId") int transactionId) {
        return checkRecordRepository.findByTransactionId(transactionId).get().getImageFront();
    }

    @GetMapping(path="/checkRecord/{transactionId}/back", produces="image/jpg")
    public byte[] getCheckImageBack(@PathVariable("transactionId") int transactionId) {
        return checkRecordRepository.findByTransactionId(transactionId).get().getImageBack();
    }
}
