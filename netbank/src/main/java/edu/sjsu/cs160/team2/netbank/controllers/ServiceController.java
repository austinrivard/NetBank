package edu.sjsu.cs160.team2.netbank.controllers;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import edu.sjsu.cs160.team2.netbank.repositories.*;
import edu.sjsu.cs160.team2.netbank.util.TransferArgs;
import edu.sjsu.cs160.team2.netbank.models.*;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
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
    private ReportController reportController;

    @Autowired
    private CheckRecordRepository checkRecordRepository;
    
    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/allAccounts")
    public List<Account> getAccounts() {
        List<Account> allAccounts = accountRepository.findAll();
        System.out.println("[GET: /api/accounts] Retrieved accounts: " + allAccounts);
        return allAccounts;
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/report")
    public Map<String, Object> generateReport(){
        Map<String, Object> report = new HashMap<>();
        report.put("averageAccountBalance", reportController.calculateAverageAccountBalance());
        report.put("mostCommonZipCode", reportController.findMostCommonZipCode());
        System.out.println("Generated admin report: " + report);
        return report;
    }

    @GetMapping("/user/role")
    public boolean isAdmin() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("admin"));
    }

    @GetMapping("/accounts")
    public List<Account> getUserAccounts() {
        String uid = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Account> userAccounts = accountRepository.findAllByUserUid(uid);
        // System.out.println("[GET: /api/accounts] Retrieved accounts: " + userAccounts);
        return userAccounts;
    }
    
    @PostMapping("/account")
    public Account postAccount(@RequestBody Account account) {
        String uid = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("posting new account with uid: " + uid);
        User lookupUser = userRepository.findByUid(uid).get();
        account.setUser(lookupUser);
        return accountRepository.save(account);
    }

    @DeleteMapping("/account")
    public boolean deleteAccount(@RequestBody Account account) {
        System.out.print("Delete account: " + account);

        String uid = SecurityContextHolder.getContext().getAuthentication().getName();

        for (Account acc : accountRepository.findAllByUserUid(uid)) {
            System.out.println(acc);
            if (acc.getNumber().equals(account.getNumber())) {
                accountRepository.delete(acc);
                return true;
            }
        }
        return false;
    }

    @GetMapping("/user")
    public User getUser() {
        String uid = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Looking up signed in user id: " + uid);
        return userRepository.findByUid(uid).get();
    }

    @PostMapping("/user")
    public User postUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/account/{accountNumber}/transaction")
    public List<Transaction> getTransactions(@PathVariable String accountNumber) {
        List<Transaction> accountTransactions = transactionRepository.findAllByAccountNumber(accountNumber);
        System.out.println("[GET: /api/account/" + accountNumber + "/transaction] Found transactions: " + accountTransactions);
        return accountTransactions;
    }

    @PostMapping("/account/{accountNumber}/transaction")
    public Transaction postTransaction(@PathVariable String accountNumber, @RequestBody Transaction transaction) {
        transaction.setAccount(accountRepository.findById(accountNumber).get());
        return transactionRepository.save(transaction);
    }

    @PostMapping("/processTransfer")
    public Transaction processTransfer(@RequestBody TransferArgs transferArgs) {
        System.out.println("[POST: /api/processTransfer] Received transfer request from account: " + transferArgs.fromAccount);

        if (!transferArgs.fromAccount.getRoutingNumber().equals("420420420")
            && !transferArgs.toAccount.getRoutingNumber().equals("420420420")) {
            throw new IllegalArgumentException("Neither routing number is ours");
        }

        Transaction transaction;

        if (transferArgs.fromAccount.getRoutingNumber().equals("420420420")) {
            Account fromAccount = accountRepository.findById(transferArgs.fromAccount.getNumber()).get();

            if (transferArgs.toAccount.getRoutingNumber().equals("420420420")) {
                // internal transfer
                Account toAccount = accountRepository.findById(transferArgs.toAccount.getNumber()).get();
                transaction = accountController.executeTransfer(fromAccount, toAccount, transferArgs.amount, transferArgs.description);
            } else {
                // transfer from internal account to external account
                transaction = accountController.updateBalance(fromAccount, transferArgs.amount.negate());
            }
        } else {
            // transfer from external account to internal account
            Account toAccount = accountRepository.findById(transferArgs.toAccount.getNumber()).get();
            transaction = accountController.updateBalance(toAccount, transferArgs.amount);
        }

        transaction.setDate(transferArgs.getDate() == null ? LocalDate.now() : transferArgs.getDate());

        transaction.setDescription(transferArgs.description);
        return transactionRepository.save(transaction);
    }

    @PostMapping(path="/depositCheck", consumes={"multipart/form-data"})
    public Transaction depositCheck(
        @RequestPart("account") Account account,
        @RequestPart("amount") BigDecimal amount,
        @RequestPart(name="date", required=false) LocalDate date,
        @RequestPart("imageFront") MultipartFile imageFront,
        @RequestPart("imageBack") MultipartFile imageBack
    ) throws IOException {
        System.out.println("[POST: /api/depositCheck] Received deposit of $" + amount + " to: " + account);

        if (amount.compareTo(BigDecimal.ZERO) != 1) throw new IllegalArgumentException("Amount must be non-negative");
        System.out.println("Depositing check to account: " + account);
        account = accountRepository.findById(account.getNumber()).get();

        Transaction transaction = accountController.updateBalance(account, amount);
        transaction.setDescription("Mobile Check Deposit");
        transaction.setDate(date == null ? LocalDate.now() : date);

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
