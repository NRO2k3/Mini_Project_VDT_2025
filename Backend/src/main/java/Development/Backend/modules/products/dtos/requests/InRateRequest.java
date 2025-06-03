package Development.Backend.modules.products.dtos.requests;

import java.math.BigDecimal;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InRateRequest {

  @NotNull(message="Term không được để trống")
  private Integer term;

  @NotNull(message="Rate không được để trống")
  @Digits(integer=2, fraction=2, message="Rate phải có tối đa 2 chữ số phần nguyên và 2 chữ số phần thập phân")
  private BigDecimal rate;

}
