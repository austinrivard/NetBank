package edu.sjsu.cs160.team2.netbank.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String uid;

    private String ssn;

    private String firstName;

    @Nullable
    private String middleName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String street;

    private String city;

    private String state;

    private String zipcode;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"user", "transactions"})
    @ToString.Exclude
    private Set<Account> accounts;
}
