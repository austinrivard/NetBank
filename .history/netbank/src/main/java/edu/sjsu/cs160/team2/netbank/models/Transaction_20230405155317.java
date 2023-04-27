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

    private Integer accountId;

    private Integer targetAccountId;

    private String type;

    private Integer dollars;

    private

    private Integer cents;
}
