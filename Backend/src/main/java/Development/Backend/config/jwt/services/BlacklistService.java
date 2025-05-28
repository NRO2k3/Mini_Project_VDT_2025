package Development.Backend.config.jwt.services;

import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import Development.Backend.config.jwt.dtos.requests.BlacklistTokenRequest;
import Development.Backend.config.jwt.entities.BlacklistedToken;
import Development.Backend.config.jwt.repositories.BlacklistedTokenRepository;
import Development.Backend.handlers.custom_exception.ErrorException;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BlacklistService {
  @Autowired
  private BlacklistedTokenRepository blacklistedTokenRepository;

  @Autowired
  private JwtService jwtService;

  public void create(BlacklistTokenRequest request){

        if(blacklistedTokenRepository.existsByToken(request.getRefreshToken())){
          throw new ErrorException("Token này đã có trong danh sách blacklist", HttpStatus.BAD_REQUEST);
        }
        
        Claims claims = jwtService.extractAllClaims(request.getRefreshToken());
        Long userId = Long.valueOf(claims.getSubject());
        Date expiryDate = claims.getExpiration();

        BlacklistedToken blacklistedToken = new BlacklistedToken();
        blacklistedToken.setToken(request.getRefreshToken());
        blacklistedToken.setUserId(userId);
        blacklistedToken.setExpiryDate(expiryDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
        blacklistedTokenRepository.save(blacklistedToken);
        log.info("Token đã được thêm vào danh sách blacklist ");
  }
}
