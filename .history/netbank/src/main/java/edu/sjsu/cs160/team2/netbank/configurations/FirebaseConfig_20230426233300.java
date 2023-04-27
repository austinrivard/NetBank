package edu.sjsu.cs160.team2.netbank.configurations;

import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import io.flutter.app.FlutterApplication;

public class FirebaseConfig {
    public static void initialize(FlutterApplication application) {
        try {
            // Check if the platform is Android
            if (isAndroid()) {
                InputStream serviceAccount = application.getAssets().open("google-services.json");

                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
            }
            // Otherwise, the platform must be iOS
            else {
                InputStream serviceAccount = application.getAssets().open("GoogleService-Info.plist");

                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static boolean isAndroid() {
        String os = System.getProperty("os.name").toLowerCase();
        return os.contains("android");
    }
}