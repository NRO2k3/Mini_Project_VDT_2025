package Development.Backend.modules.users.dtos.responses;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginResponse {
  private final UserResponse user;
}
