package edu.sjsu.cs160.team2.netbank.controllers;

import edu.sjsu.cs160.team2.netbank.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/verifyToken")
    public ResponseEntity<String> verifyToken(@RequestBody String idToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();

            //Verify if user still exists in Azure
            userRepository.findById(uid).orElseThrow(() -> new UsernameNotFoundException("User not found"));

            //Return HTTP response with status code 200 and 
            return ResponseEntity.ok(uid);

        } catch (FirebaseAuthException | IllegalArgumentException | UsernameNotFoundException e) {
            //Return HTTP response with status code 401
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
