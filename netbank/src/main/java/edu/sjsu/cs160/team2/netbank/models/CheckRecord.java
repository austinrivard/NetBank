package edu.sjsu.cs160.team2.netbank.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Lob
    private byte[] imageFront, imageBack;

    @OneToOne
    private Transaction transaction;
}
