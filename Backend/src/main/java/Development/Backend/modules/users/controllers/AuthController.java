package Development.Backend.modules.users.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Development.Backend.config.jwt.config.JwtConfig;
import Development.Backend.config.jwt.dtos.responses.RefreshTokenResponse;
import Development.Backend.config.jwt.services.BlacklistService;
import Development.Backend.config.jwt.services.JwtService;
import Development.Backend.config.jwt.services.RefreshService;
import Development.Backend.modules.users.dtos.requests.LoginRequest;
import Development.Backend.modules.users.dtos.responses.ApiResponse;
import Development.Backend.modules.users.dtos.responses.LoginResponse;
import Development.Backend.modules.users.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  @Autowired
  private UserService userService;

  @Autowired
  private BlacklistService blacklistService;

  @Autowired
  private RefreshService refreshService;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private JwtConfig jwtConfig;


  @PostMapping("login")
  public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest request){
    LoginResponse auth = userService.authenticate(request);

    String accessTokenCookie = "access_token=" + jwtService.generateToken(auth.getUser().getId(), auth.getUser().getEmail()) + "; HttpOnly; Secure; Path=/; Max-Age=" + (jwtConfig.getExprirationTime()/1000) + "; SameSite=None; Partitioned";
    String refreshTokenCookie = "refresh_token=" + jwtService.generateRefreshToken(auth.getUser().getId(), auth.getUser().getEmail()) +  "; HttpOnly; Secure; Path=/; Max-Age=" + jwtConfig.getRefreshTokenExprirationTime()/1000 + "; SameSite=None; Partitioned";

    ApiResponse<LoginResponse> response = ApiResponse.ok(auth, "Xác thực thành công");
    return ResponseEntity.ok()
    .headers(headers -> {
      headers.add("Set-Cookie", accessTokenCookie);
      headers.add("Set-Cookie", refreshTokenCookie);
    })
    .body(response);
  }

  @PostMapping("blacklisted_tokens")
  public ResponseEntity<ApiResponse<?>> addTokenBlacklist(HttpServletRequest request) {
    blacklistService.create(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Thêm Refresh Token vào Blacklist thành công");
    return ResponseEntity.ok(response);
  }

  @PostMapping("logout")
  public ResponseEntity<?> logout(HttpServletRequest request) {
      userService.logOutUser(request);
      ApiResponse<?> response = ApiResponse.ok(null, "Log out thành công");
      return ResponseEntity.ok(response);
  
  }

  @PostMapping("token/refresh")
  public ResponseEntity<ApiResponse<?>> refreshToken(HttpServletRequest request) {
    String accessToken = refreshService.getAccessToken(request);
    String accessTokenCookie = "access_token=" + accessToken + "; HttpOnly; Secure; Path=/; Max-Age=" + (jwtConfig.getExprirationTime()/1000) + "; SameSite=None; Partitioned";
    ApiResponse<RefreshTokenResponse> response = ApiResponse.ok(null, "Refresh Token thành công");
    return ResponseEntity.ok()
    .header("Set-Cookie", accessTokenCookie)
    .body(response);
  }

  @PostMapping("token/verify")
  public ResponseEntity<ApiResponse<?>> verifyToken(HttpServletRequest request) {
    ApiResponse<?> response = ApiResponse.ok(null, "Check thành công qua filter");
    return ResponseEntity.ok(response);
  }
}