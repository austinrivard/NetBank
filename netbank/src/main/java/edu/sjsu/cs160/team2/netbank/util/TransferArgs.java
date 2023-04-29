package edu.sjsu.cs160.team2.netbank.util;

import java.math.BigDecimal;

import edu.sjsu.cs160.team2.netbank.models.Account;

public class TransferArgs {
    public Account fromAccount, toAccount; // only account number is needed, routing number is optional (defaults to our own)
    public BigDecimal amount;
    public String description;
}
