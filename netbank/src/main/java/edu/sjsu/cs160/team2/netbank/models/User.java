package edu.sjsu.cs160.team2.netbank.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String firstName;

    @Nullable
    private String middleName;

    private String lastName;

    private String streetAddress;

    private String city;

    private String state;

    @OneToMany(mappedBy = "user")
    private Set<Account> accounts;

    
}
