package Development.Backend.config.jwt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import Development.Backend.handlers.custom_exception.ErrorException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RefreshService {

  @Autowired
  private JwtService jwtService;

  public String getAccessToken(HttpServletRequest request){

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
    else{
      if(jwtService.isBlacklistdToken(refreshToken) || !jwtService.isIssuerToken(refreshToken) || !jwtService.isSignatureValid(refreshToken) || jwtService.isTokenExpired(refreshToken)){
        throw new ErrorException("Token vi phạm điều kiện", HttpStatus.BAD_REQUEST);
      }
    }

    String userId = jwtService.extractUserId(refreshToken);
    String email = jwtService.extractEmail(refreshToken);
    String accessToken = jwtService.generateToken(Long.valueOf(userId), email);

    return accessToken;
  }
}
