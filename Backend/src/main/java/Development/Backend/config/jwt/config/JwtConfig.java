package Development.Backend.config.jwt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@Data
public class JwtConfig {
    
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expirationAccessToken}")
    private Long exprirationTime;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.expirationRefreshToken}")
    private Long refreshTokenExprirationTime;

}
