package edu.sjsu.cs160.team2.netbank.models;

import java.math.BigDecimal;

import org.hibernate.annotations.GenericGenerator;

// import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import lombok.Builder.Default;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GenericGenerator(name = "account_number", strategy = "edu.sjsu.cs160.team2.netbank.util.AccountNumberGenerator")
    @GeneratedValue(generator = "account_number")  
    @Column(length = 9)
    private String number; // generates a random 9 digit string of numbers

    @Default
    private String routingNumber = "420420420";

    @Default
    private BigDecimal balance = new BigDecimal(0.0);

    private String type; // checking or savings

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
