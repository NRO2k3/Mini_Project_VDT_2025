package Development.Backend.modules.products.dtos.responses;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BankingProductResponse {
  private final Long id;
  private final String name;
  private final String description;
  private final BigDecimal minAmount;
  private final BigDecimal maxAmount;
  private final String type;
}
