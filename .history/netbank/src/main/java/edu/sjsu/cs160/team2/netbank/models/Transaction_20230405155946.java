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
    private Integer id;

    public enum transactionType {
        DEPOSIT,
        WITHDRAWAL,
        TRANSFER
    }

    private Integer userAddress;

    private Integer targetAddress; //For transfers only

    private String type;

    private String date;

    private String description;

    private Integer dollars;

    private Integer cents;



}
