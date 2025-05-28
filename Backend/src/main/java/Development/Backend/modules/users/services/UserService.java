package Development.Backend.modules.users.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Development.Backend.config.jwt.dtos.requests.BlacklistTokenRequest;
import Development.Backend.config.jwt.services.BlacklistService;
import Development.Backend.config.jwt.services.JwtService;
import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.users.dtos.requests.LoginRequest;
import Development.Backend.modules.users.dtos.requests.RegisterRequest;
import Development.Backend.modules.users.dtos.responses.LoginResponse;
import Development.Backend.modules.users.dtos.responses.UserResponse;
import Development.Backend.modules.users.entities.Role;
import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.RoleRepository;
import Development.Backend.modules.users.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService{

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private BlacklistService blacklistService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

    @Autowired
  private JwtService jwtService;

  public LoginResponse authenticate (LoginRequest request){

    User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()-> new ErrorException("Email hoặc mật khẩu không chính xác", HttpStatus.UNAUTHORIZED));

    if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
      throw new ErrorException("Email hoặc mật khẩu không chính xác", HttpStatus.UNAUTHORIZED);
    }

    UserResponse userResource = UserResponse.builder()
                                            .id(user.getId())
                                            .email(user.getEmail())
                                            .name(user.getName())
                                            .phone(user.getPhone())
                                            .role(user.getRoleId().getId())
                                            .build();
    String accessToken = jwtService.generateToken(user.getId(), user.getEmail());
    String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());
    return new LoginResponse(userResource, accessToken, refreshToken);
  }

  public void logOutUser(String token){
    try {
      BlacklistTokenRequest request = new BlacklistTokenRequest();
      request.setRefreshToken(token);
      blacklistService.create(request);
    } catch (Exception e) {
      throw e;
    }
  }

  public void registerUser(RegisterRequest request){
    if(userRepository.existsByEmail(request.getEmail())||userRepository.existsByPhone(request.getPhone())){
      throw new ErrorException("email đã tồn tại hoặc số điện thoại đã tồn tại", HttpStatus.BAD_REQUEST);
    }

    User newUser = new User();
    newUser.setEmail(request.getEmail());
    newUser.setPhone(request.getPhone());
    newUser.setName(request.getName());
    newUser.setPassword(passwordEncoder.encode(request.getPassword()));
    Role role = roleRepository.findById(2L)
                          .orElseThrow(() -> new ErrorException("Role not found", HttpStatus.BAD_GATEWAY));
    newUser.setRoleId(role);
    userRepository.save(newUser);
  }
}
