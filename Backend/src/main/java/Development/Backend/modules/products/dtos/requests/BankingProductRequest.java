package Development.Backend.modules.products.dtos.requests;

import java.math.BigDecimal;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BankingProductRequest {

  private Long id;

  @NotNull(message="Name không được để trống")
  private String name;

  @NotNull(message="Description không được để trống")
  private String description;

  @Digits(integer=16, fraction=2, message="minAmount phải có tối đa 16 chữ số phần nguyên và 2 chữ số phần thập phân")
  @NotNull(message="minAmount không được để trống")
  private BigDecimal minAmount;

  @Digits(integer=16, fraction=2, message="maxAmount phải có tối đa 16 chữ số phần nguyên và 2 chữ số phần thập phân")
  @NotNull(message="maxAmount không được để trống")
  private BigDecimal maxAmount;

  @NotNull(message="Type không được để trống")
  private String type;
}
