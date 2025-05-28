package Development.Backend.modules.users.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Development.Backend.config.jwt.dtos.requests.BlacklistTokenRequest;
import Development.Backend.config.jwt.dtos.requests.RefreshTokenRequest;
import Development.Backend.config.jwt.dtos.responses.RefreshTokenResponse;
import Development.Backend.config.jwt.services.BlacklistService;
import Development.Backend.config.jwt.services.RefreshService;
import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.users.dtos.requests.LoginRequest;
import Development.Backend.modules.users.dtos.requests.RegisterRequest;
import Development.Backend.modules.users.dtos.responses.ApiResponse;
import Development.Backend.modules.users.dtos.responses.LoginResponse;
import Development.Backend.modules.users.dtos.responses.UserResponse;
import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.UserRepository;
import Development.Backend.modules.users.services.UserService;
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
  private UserRepository userRepository;

  @Autowired
  private RefreshService refreshService;

  @PostMapping("login")
  public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest request){
    LoginResponse auth = userService.authenticate(request);
    ApiResponse<LoginResponse> response = ApiResponse.ok(auth, "Xác thực thành công");
    return ResponseEntity.ok(response);
  }

  @PostMapping("blacklisted_tokens")
  public ResponseEntity<ApiResponse<?>> addTokenBlacklist(@Valid @RequestBody BlacklistTokenRequest request) {
    blacklistService.create(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Thêm Refresh Token vào Blacklist thành công");
    return ResponseEntity.ok(response);
  }

  @PostMapping("logout")
  public ResponseEntity<?> logout(@RequestHeader("Authorization") String bearerToken) {
      String token = bearerToken.substring(7);
      userService.logOutUser(token);
      ApiResponse<?> response = ApiResponse.ok(null, "Log out thành công");
      return ResponseEntity.ok(response);
  
  }

  @PostMapping("refresh")
  public ResponseEntity<ApiResponse<?>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
    RefreshTokenResponse refreshToken = refreshService.getRefreshToken(request);
    ApiResponse<RefreshTokenResponse> response = ApiResponse.ok(refreshToken, "Refresh Token thành công");
    return ResponseEntity.ok(response);
  }

  @PostMapping("register")
  public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest request) {
    log.info("hmmm");
    userService.registerUser(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Tạo tài khoản thành công");
    return ResponseEntity.ok(response);
  }

  @GetMapping("me")
  public ResponseEntity<ApiResponse<UserResponse>> me(){

    String email = SecurityContextHolder.getContext().getAuthentication().getName();

    User user = userRepository.findByEmail(email).orElseThrow(()-> new ErrorException("User Không Tồn Tại",HttpStatus.BAD_REQUEST));

    UserResponse userResource = UserResponse.builder()
                                            .id(user.getId())
                                            .email(user.getEmail())
                                            .name(user.getName())
                                            .phone(user.getPhone())
                                            .build();

    ApiResponse<UserResponse> response = ApiResponse.ok(userResource, "Get You Successfully");
    return ResponseEntity.ok(response);
  }
}