package Development.Backend.modules.users.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message="Email không được để trống")
    @Email(message="Email không đúng định dạng")
    @Pattern(
    regexp = "^[a-zA-Z0-9._%+-]+@gmail\\.com$",
    message = "Email phải là địa chỉ Gmail hợp lệ (vd: abc@gmail.com)")
    private String email;

    @NotBlank(message="Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu ít nhất là 6 kí tự")
    private String password;

    @NotBlank(message="Username không được để trống")
    private String name;

    @NotBlank(message="Phone không được để trống")
    private String phone;
}
