package Development.Backend.config.jwt.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlacklistTokenRequest {
  @NotBlank(message = "Token không dược để trống")
  private String refreshToken;
}
