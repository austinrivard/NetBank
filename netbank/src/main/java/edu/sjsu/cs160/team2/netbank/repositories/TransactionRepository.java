package edu.sjsu.cs160.team2.netbank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cs160.team2.netbank.models.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>  {    
    public List<Transaction> findAllByAccountNumber(String accountNumber);
}
