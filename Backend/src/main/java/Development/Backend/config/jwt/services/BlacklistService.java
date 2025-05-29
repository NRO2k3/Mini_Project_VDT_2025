package Development.Backend.config.jwt.services;

import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import Development.Backend.config.jwt.entities.BlacklistedToken;
import Development.Backend.config.jwt.repositories.BlacklistedTokenRepository;
import Development.Backend.handlers.custom_exception.ErrorException;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BlacklistService {
  @Autowired
  private BlacklistedTokenRepository blacklistedTokenRepository;

  @Autowired
  private JwtService jwtService;

  public void create(HttpServletRequest request){

        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        if (cookies != null) {
          for (Cookie cookie : cookies) {
            if ("refresh_token".equals(cookie.getName())) {
              refreshToken = cookie.getValue();
              break;
            }
          }
        } else {
          throw new ErrorException("Token không có trong Cookie", HttpStatus.BAD_REQUEST);
        }

        if(refreshToken == null) throw new ErrorException("Token không có trường refresh_token trong Cookie", HttpStatus.BAD_REQUEST);

        if(blacklistedTokenRepository.existsByToken(refreshToken)){
          throw new ErrorException("Token này đã có trong danh sách blacklist", HttpStatus.BAD_REQUEST);
        }
        
        Claims claims = jwtService.extractAllClaims(refreshToken);
        Long userId = Long.valueOf(claims.getSubject());
        Date expiryDate = claims.getExpiration();

        BlacklistedToken blacklistedToken = new BlacklistedToken();
        blacklistedToken.setToken(refreshToken);
        blacklistedToken.setUserId(userId);
        blacklistedToken.setExpiryDate(expiryDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
        blacklistedTokenRepository.save(blacklistedToken);
        log.info("Token đã được thêm vào danh sách blacklist ");
  }
}
