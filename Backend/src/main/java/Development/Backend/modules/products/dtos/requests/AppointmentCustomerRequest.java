package Development.Backend.modules.products.dtos.requests;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentCustomerRequest {
  
  @NotNull(message="Product Id không được để trống")
  private Long productId;
  @NotNull(message="Date không được để trống")
  private LocalDateTime date;
  @NotNull(message="Amount không được để trống")
  @Digits(integer=16, fraction=2, message="Amount phải có tối đa 26 chữ số phần nguyên và 2 chữ số phần thập phân")
  private BigDecimal amount;

  private String message;
  private String status;
  private Long id;
}
