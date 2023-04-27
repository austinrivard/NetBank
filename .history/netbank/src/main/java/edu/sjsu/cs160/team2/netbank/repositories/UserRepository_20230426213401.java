package edu.sjsu.cs160.team2.netbank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cs160.team2.netbank.models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>  { 
    public User getUserByUid(String uid) {
        return userRepository.findByUid(uid)
            .orElseThrow(() -> new NoSuchElementException("User not found for uid: " + uid));
    }
}
