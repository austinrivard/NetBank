package edu.sjsu.cs160.team2.netbank.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import edu.sjsu.cs160.team2.netbank.models.Account;

import edu.sjsu.cs160.team2.netbank.repositories.*;
import edu.sjsu.cs160.team2.netbank.models.*;

@Controller
public class ReportController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository; 
    
    public double calculateAverageAccountBalance() {
        List<Account> accounts = accountRepository.findAll();
        if (accounts.isEmpty()) return 0.0;

        System.out.println("All accounts: " + accounts);
        
        BigDecimal totalBalance = new BigDecimal(0);
        for (Account account : accounts) {
            totalBalance = totalBalance.add(account.getBalance());
        }

        System.out.println("Total balance: " + totalBalance);
        return totalBalance.doubleValue() / accounts.size();
    }
    
    public String findMostCommonZipCode() {
        List<User> users = userRepository.findAll();
        Map<String, Integer> zipCodeCounts = new HashMap<>();
        for (User u : users) {
            String zipCode = u.getZipcode();
            if (zipCodeCounts.containsKey(zipCode)) {
                zipCodeCounts.put(zipCode, zipCodeCounts.get(zipCode) + 1);
            } else {
                zipCodeCounts.put(zipCode, 1);
            }
        }
        String mostCommonZipCode = null;
        int maxCount = 0;
        for (String zipCode : zipCodeCounts.keySet()) {
            int count = zipCodeCounts.get(zipCode);
            if (count > maxCount) {
                maxCount = count;
                mostCommonZipCode = zipCode;
            }
        }
        return mostCommonZipCode;
    }
}