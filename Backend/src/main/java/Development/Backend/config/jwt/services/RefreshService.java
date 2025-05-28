package Development.Backend.config.jwt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import Development.Backend.config.jwt.dtos.requests.RefreshTokenRequest;
import Development.Backend.config.jwt.dtos.responses.RefreshTokenResponse;
import Development.Backend.handlers.custom_exception.ErrorException;

@Service
public class RefreshService {

  @Autowired
  private JwtService jwtService;

  public RefreshTokenResponse getRefreshToken(RefreshTokenRequest request){
    String refreshToken = request.getRefreshToken();
    if(!jwtService.isRefreshTokenValid(refreshToken)){
      throw new ErrorException("refreshToken không đúng định dạng hoặc hết hạng", HttpStatus.BAD_REQUEST);
    }

    Long userId = Long.valueOf(jwtService.extractUserId(refreshToken));
    String email = jwtService.extractEmail(refreshToken);
    String newToken = jwtService.generateToken(userId, email);

    return new RefreshTokenResponse(newToken);
  }
}
