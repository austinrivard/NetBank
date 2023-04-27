package edu.sjsu.cs160.team2.netbank.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer targetId;

    private String type;

    private String description;

    private Date date;

    private BigDecimal amount;

    private BigDecimal balance;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
