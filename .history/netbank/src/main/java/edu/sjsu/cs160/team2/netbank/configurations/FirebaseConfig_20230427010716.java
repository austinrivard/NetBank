package edu.sjsu.cs160.team2.netbank.configurations;

import java.io.FileInputStream;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

    @Autowired
    ResourceLoader resourceLoader;

    @PostConstruct
    public void initialize() throws IOException {
        

        FileInputStream serviceAccount = new FileInputStream("configurations/banking-app-5dba2-firebase-adminsdk-sz3fj-731fc3bd9c.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);
    }

}