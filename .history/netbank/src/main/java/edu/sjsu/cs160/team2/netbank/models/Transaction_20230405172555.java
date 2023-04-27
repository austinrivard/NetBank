package edu.sjsu.cs160.team2.netbank.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.form

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public enum TransactionType {
        DEPOSIT,
        WITHDRAWAL,
        TRANSFER
    }

    private Integer userID;

    private Integer targetID; //For transfers only

    private TransactionType type;

    private String date;

    private String description;

    private Integer dollars;

    private Integer cents;

}
