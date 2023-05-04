package edu.sjsu.cs160.team2.netbank.util;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.google.auto.value.AutoValue.Builder;

import edu.sjsu.cs160.team2.netbank.models.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransferArgs {
    public Account fromAccount, toAccount; // only account number is needed, routing number is optional (defaults to our own)
    public BigDecimal amount;
    public String description;
    public LocalDate date;
}
