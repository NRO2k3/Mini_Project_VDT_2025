package Development.Backend.modules.users.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Development.Backend.config.jwt.services.BlacklistService;
import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.users.dtos.requests.LoginRequest;
import Development.Backend.modules.users.dtos.requests.RegisterRequest;
import Development.Backend.modules.users.dtos.requests.UpdateUserRequest;
import Development.Backend.modules.users.dtos.responses.LoginResponse;
import Development.Backend.modules.users.dtos.responses.UserResponse;
import Development.Backend.modules.users.entities.Role;
import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.RoleRepository;
import Development.Backend.modules.users.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService{

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private BlacklistService blacklistService;

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
                                            .role(user.getRoleId().getName())
                                            .build();
    return new LoginResponse(userResource);
  }

  public void logOutUser(HttpServletRequest request){
    try {
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
                          .orElseThrow(() -> new ErrorException("Role not found", HttpStatus.BAD_REQUEST));
    newUser.setRoleId(role);
    userRepository.save(newUser);
  }

  public void updateUserService(UpdateUserRequest request){
    User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()-> new ErrorException("User không tồn tại", HttpStatus.BAD_REQUEST));
    user.setEmail(request.getEmail());
    Role role = roleRepository.findByName(request.getRole()).orElseThrow(() -> new ErrorException("Vai trò không tồn tại", HttpStatus.BAD_REQUEST));
    user.setRoleId(role);
    user.setPhone(request.getPhone());
    user.setName(request.getName());
    userRepository.save(user);
  }

  public void deleteUserService(Long id){
    User user = userRepository.findById(id).orElseThrow(() -> new ErrorException("User không tồn tại", HttpStatus.BAD_REQUEST));
    userRepository.delete(user);
  }

  public List<User> getUserByRoleService(String role){
    Role role_ob = roleRepository.findByName(role).orElseThrow(() -> new ErrorException("Role không tồn tại", HttpStatus.BAD_REQUEST));
    return userRepository.findByRoleId(role_ob);
  }
}
