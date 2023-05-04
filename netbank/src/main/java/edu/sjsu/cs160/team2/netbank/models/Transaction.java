package edu.sjsu.cs160.team2.netbank.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String type; //deposit, withdraw

    private String transferAccountNumber; //For transfers only, otherwise null

    private String description; 

    private LocalDate date;

    private BigDecimal amount;

    private BigDecimal balance;

    @ManyToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name = "account_number")
    @JsonIgnoreProperties({"user", "transactions"})
    private Account account;
}
