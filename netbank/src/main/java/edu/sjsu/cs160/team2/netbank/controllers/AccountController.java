package edu.sjsu.cs160.team2.netbank.controllers;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cs160.team2.netbank.repositories.*;
import edu.sjsu.cs160.team2.netbank.models.*;

@Controller
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;
    
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Transaction updateBalance(Account account, BigDecimal amount) {
        Transaction transaction = Transaction
            .builder()
            .type(amount.compareTo(BigDecimal.ZERO) == -1 ? "withdraw" : "deposit")
            .date(LocalDate.now())
            .amount(amount)
            .balance(account.getBalance().add(amount))
            .account(account)
            .build();
        
        account.setBalance(transaction.getBalance());
        accountRepository.save(account);
        
        return transactionRepository.save(transaction);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Transaction executeTransfer(Account fromAccount, Account toAccount, BigDecimal amount) {
        Transaction fromTransaction = updateBalance(fromAccount, amount.negate());
        Transaction toTransaction   = updateBalance(toAccount, amount);

        fromTransaction.setDescription("Transfer to " + toAccount.getNumber().substring(5));
        fromTransaction.setTransferAccountNumber(toAccount.getNumber());

        toTransaction.setDescription("Transfer from " + fromAccount.getNumber().substring(5));
        toTransaction.setTransferAccountNumber(fromAccount.getNumber());
        
        transactionRepository.save(fromTransaction);
        return transactionRepository.save(toTransaction);
    }
}
