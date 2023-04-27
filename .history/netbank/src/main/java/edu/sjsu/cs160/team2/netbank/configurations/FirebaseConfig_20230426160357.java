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
