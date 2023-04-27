package edu.sjsu.cs160.team2.netbank.configurations;

import org.springframework.context.annotation.*;
import java.io.*;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {
    @Bean
    public void firebaseInit() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("<path-to-firebase-adminsdk-json>");

        FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("<your-database-url>")
            .build();

        FirebaseApp.initializeApp(options);
    }

    @Bean
    public FirebaseAuth firebaseAuth() {
        return FirebaseAuth.getInstance();
    }
}
