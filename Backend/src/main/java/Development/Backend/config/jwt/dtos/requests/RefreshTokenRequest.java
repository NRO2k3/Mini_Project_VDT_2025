package Development.Backend.config.jwt.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequest {
  @NotBlank(message = "Token không dược để trống")
  private String refreshToken;
}
