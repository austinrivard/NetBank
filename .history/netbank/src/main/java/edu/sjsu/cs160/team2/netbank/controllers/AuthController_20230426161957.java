package edu.sjsu.cs160.team2.netbank.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/verifyToken")
    public ResponseEntity<String> verifyToken(@RequestBody String idToken, HttpServletResponse response) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            return ResponseEntity.ok(decodedToken.getUid());
        } catch (FirebaseAuthException | IllegalArgumentException | IOException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
