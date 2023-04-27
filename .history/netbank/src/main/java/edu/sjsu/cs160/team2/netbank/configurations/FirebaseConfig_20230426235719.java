package edu.sjsu.cs160.team2.netbank.configurations;

import java.io.FileInputStream;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

    private static final String CONFIG_FILE_PATH = "NetBank/netbank/src/main/java/edu/sjsu/cs160/team2/netbank/configurations/banking-app-5dba2-firebase-adminsdk-sz3fj-f2c39f016c.json";

    @PostConstruct
    public void initialize() throws IOException {
        FileInputStream serviceAccount = new FileInputStream(CONFIG_FILE_PATH);

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);
    }

}