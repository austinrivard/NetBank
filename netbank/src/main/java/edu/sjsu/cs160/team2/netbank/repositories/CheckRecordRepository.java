package edu.sjsu.cs160.team2.netbank.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cs160.team2.netbank.models.CheckRecord;

@Repository
public interface CheckRecordRepository extends JpaRepository<CheckRecord, Integer>  {
    public Optional<CheckRecord> findByTransactionId(int transactionId);
}
