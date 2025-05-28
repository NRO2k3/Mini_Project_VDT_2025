package Development.Backend.modules.users.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message="Email không được để trống")
    @Email(message="Email không đúng định dạng")
    private String email;

    @NotBlank(message="Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu ít nhất là 6 kí tự")
    private String password;
}