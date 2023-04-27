package edu.sjsu.cs160.team2.netbank.controllers;
f
@RestController
public class AuthController {
    @Autowired
    private FirebaseAuth firebaseAuth;

    @GetMapping("/api/auth")
    public ResponseEntity<?> authenticateUser(@RequestParam String idToken) {
        try {
            FirebaseToken decodedToken = firebaseAuth.verifyIdToken(idToken);
            String uid = decodedToken.getUid();

            // Query the JPA data store for user information using the uid
            User user = userService.getUserByUid(uid);

            return ResponseEntity.ok(user);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}