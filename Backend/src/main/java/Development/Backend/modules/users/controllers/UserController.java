package Development.Backend.modules.users.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.users.dtos.requests.RegisterRequest;
import Development.Backend.modules.users.dtos.requests.UpdateUserRequest;
import Development.Backend.modules.users.dtos.responses.ApiResponse;
import Development.Backend.modules.users.dtos.responses.UserResponse;
import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.UserRepository;
import Development.Backend.modules.users.services.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Validated
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserService userService;

  @PostMapping("create")
  public ResponseEntity<ApiResponse<?>> createUser(@Valid @RequestBody RegisterRequest request) {
    userService.registerUser(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Tạo tài khoản thành công");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list")
  public ResponseEntity<ApiResponse<?>> listUser() {
    List<UserResponse> users = (userRepository.findAll()).stream().map(user -> UserResponse.builder()
    .id(user.getId())
    .email(user.getEmail())
    .name(user.getName())
    .phone(user.getPhone())
    .role(user.getRoleId().getName())
    .build()
    ).collect(Collectors.toList());
    ApiResponse<List<UserResponse>> response = ApiResponse.ok(users, "Get Users Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/filter")
  public ResponseEntity<ApiResponse<?>> UserFilter(@RequestParam String email) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new ErrorException("User không tồn tại", HttpStatus.BAD_REQUEST) );
    UserResponse userResponse = UserResponse.builder()
    .id(user.getId())
    .email(user.getEmail())
    .name(user.getName())
    .phone(user.getPhone())
    .role(user.getRoleId().getName())
    .build();

    List<UserResponse> userList = List.of(userResponse);
    ApiResponse<List<UserResponse>> response = ApiResponse.ok(
    userList
    ,"Get Users Successfully");
    return ResponseEntity.ok(response);
  }

  @PutMapping("update")
  public ResponseEntity<ApiResponse<?>> updateUser(@Valid @RequestBody UpdateUserRequest request ) {
    userService.updateUserService(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Update Users Successfully");
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("delete")
  public ResponseEntity<?> deleteUser(@RequestParam Long id){
    userService.deleteUserService(id);
    ApiResponse<?> response = ApiResponse.ok(null, "Delete Users Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/role")
  public ResponseEntity<?> getUserByRole(@RequestParam String role, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size){

    Page<User> userPage = userService.getUserByRoleService(role, page, size);

    List<UserResponse> users = userPage.getContent().stream().map(user -> UserResponse.builder()
    .id(user.getId())
    .email(user.getEmail())
    .name(user.getName())
    .phone(user.getPhone())
    .role(user.getRoleId().getName())
    .build()
    ).collect(Collectors.toList());

    Map<String, Object> response = new HashMap<>();
    response.put("users", users);
    response.put("totalPages", userPage.getTotalPages());
    response.put("currentPage", userPage.getNumber());
    return ResponseEntity.ok(ApiResponse.ok(response, "Get users by role successfully"));
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

  @GetMapping("list/page")
  public ResponseEntity<ApiResponse<?>> listUser( @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size){
    Pageable pageable = PageRequest.of(page, size);
    Page<User> userPage = userRepository.findAll(pageable);

    List<UserResponse> users = userPage.getContent().stream()
        .map(user -> UserResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .name(user.getName())
            .phone(user.getPhone())
            .role(user.getRoleId().getName())
            .build())
        .collect(Collectors.toList());

    Map<String, Object> result = new HashMap<>();
    result.put("users", users);
    result.put("totalPages", userPage.getTotalPages());
    result.put("currentPage", userPage.getNumber());
    result.put("totalElements", userPage.getTotalElements());

    ApiResponse<?> response = ApiResponse.ok(result, "Get Users Successfully");
    return ResponseEntity.ok(response);
}

}
