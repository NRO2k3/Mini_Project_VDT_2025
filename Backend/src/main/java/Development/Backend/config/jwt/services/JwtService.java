package Development.Backend.config.jwt.services;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Development.Backend.config.jwt.config.JwtConfig;
import Development.Backend.config.jwt.entities.RefreshToken;
import Development.Backend.config.jwt.repositories.BlacklistedTokenRepository;
import Development.Backend.config.jwt.repositories.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JwtService {

  private final JwtConfig jwtConfig;
  private final Key key;

  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Autowired
  private BlacklistedTokenRepository blacklistedTokenRepository;

  public JwtService (JwtConfig jwtConfig){
    this.jwtConfig = jwtConfig;
    this.key = Keys.hmacShaKeyFor(Base64.getEncoder().encode(jwtConfig.getSecretKey().getBytes()));
  }

  public String generateToken(Long userId, String email){
    log.info("Generating Access Token ...");
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtConfig.getExprirationTime());
    return Jwts.builder()
    .setSubject(String.valueOf(userId))
    .claim("email", email)
    .setIssuer(jwtConfig.getIssuer())
    .setIssuedAt(now)
    .setExpiration(expiryDate)
    .signWith(key, SignatureAlgorithm.HS512)
    .compact();
  }

  public String generateRefreshToken(Long userId, String email){
    log.info("Generating Refresh Token ...");
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtConfig.getRefreshTokenExprirationTime());
    String refreshToken = Jwts.builder()
    .setSubject(String.valueOf(userId))
    .claim("email", email)
    .setIssuer(jwtConfig.getIssuer())
    .setIssuedAt(now)
    .setExpiration(expiryDate)
    .signWith(key, SignatureAlgorithm.HS512)
    .compact();

    LocalDateTime localExpiryDate = expiryDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

    Optional<RefreshToken> optionnalRefreshToken = refreshTokenRepository.findByUserId(userId);

    if(optionnalRefreshToken.isPresent()){
      RefreshToken dBRefreshToken = optionnalRefreshToken.get();
      dBRefreshToken.setExpiryDate(localExpiryDate);
      dBRefreshToken.setRefreshToken(refreshToken);
      refreshTokenRepository.save(dBRefreshToken);
    } else{
      RefreshToken insertToken = new RefreshToken();
      insertToken.setRefreshToken(refreshToken);
      insertToken.setExpiryDate(localExpiryDate);
      insertToken.setUserId(userId);
      refreshTokenRepository.save(insertToken);
    }

    return refreshToken;
  }

  public String extractUserId(String token){
    return extractClaim(token, Claims::getSubject);
  }

  public String extractEmail(String token) {
    return extractClaim(token, claims -> claims.get("email", String.class));
}

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

  public Claims extractAllClaims(String token) {
      return Jwts.parserBuilder()
              .setSigningKey(key)
              .build()
              .parseClaimsJws(token)
              .getBody();
      }

  public boolean isTokenFormatValid(String token){
    try {
        String[] tokenParts = token.split("\\.");
        return tokenParts.length == 3;
    } catch (Exception e) {
      return false;
    }
  }

  public boolean isSignatureValid(String token){
    try {
      Jwts.parserBuilder().setSigningKey(getSigningkey()).build().parseClaimsJws(token);
      return true;
    } catch (SignatureException e) {
      return false;
    }
  }

  public boolean isBlacklistdToken(String token){
    return blacklistedTokenRepository.existsByToken(token);
  }

  public Key getSigningkey(){
    byte[] ketBytes = jwtConfig.getSecretKey().getBytes();
    return Keys.hmacShaKeyFor(Base64.getEncoder().encode(ketBytes));
  }

  public boolean isTokenExpired(String token){
    Date expiration = extractClaim(token, Claims::getExpiration);
    return expiration.before(new Date());
  }

  public boolean isIssuerToken(String token){
    String tokenIssuer = extractClaim(token, Claims::getIssuer);
    return jwtConfig.getIssuer().equals(tokenIssuer);
  }

  public boolean isRefreshTokenValid(String token){
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(token).orElseThrow(()-> new RuntimeException("Refresh Token không tồn tại"));
      if(blacklistedTokenRepository.existsByToken(token)){
        return false;
      }
      Date expiration = extractClaim(refreshToken.getRefreshToken(), Claims::getExpiration);
      return expiration.after(new Date());
      
    } catch (JwtException e) {
      return false;
    }
  }
}

