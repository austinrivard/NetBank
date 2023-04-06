package edu.sjsu.cs160.team2.netbank.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    public enum TransactionType {
        DEPOSIT,
        WITHDRAWAL,
        TRANSFER
    }
    
    private Integer id;

    private Integer userAddress;

    private Integer targetAddress; //For transfers only

    private String type;

    private String date;

    private String description;

    private Integer dollars;

    private Integer cents;



}