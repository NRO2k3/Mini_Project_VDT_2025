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
public class InRateResponse {
  private final Long id;
  private final Integer term;
  private final BigDecimal rate;
}
