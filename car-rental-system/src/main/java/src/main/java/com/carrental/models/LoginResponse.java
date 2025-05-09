package src.main.java.com.carrental.models;


public class LoginResponse {
    private String token;
    UserResponse user;

    public LoginResponse(String token, UserResponse user) {
        this.token = token;
        this.user = user;
    }

    public UserResponse getUser() {
        return user;
    }

    // Getter
    public String getToken() {
        return token;
    }
}