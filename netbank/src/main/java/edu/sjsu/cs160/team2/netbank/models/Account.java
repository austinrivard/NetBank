package edu.sjsu.cs160.team2.netbank.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 12)
    private String id;

    private Integer dollars;

    private Integer cents;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
