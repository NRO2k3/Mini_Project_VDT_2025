package Development.Backend.modules.users.dtos.responses;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
  private final Long id;
  private final String email;
  private final String name;
  private final String phone;
  private final String role;
}







