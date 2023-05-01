package edu.sjsu.cs160.team2.netbank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cs160.team2.netbank.models.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, String>  {    
    public List<Account> findAllByUserUid(String userUid);
}
