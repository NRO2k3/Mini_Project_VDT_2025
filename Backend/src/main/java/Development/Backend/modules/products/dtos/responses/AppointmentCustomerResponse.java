package Development.Backend.modules.products.dtos.responses;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentCustomerResponse {
  private final Long id;
  private final String email;
  private final String productType;
  private final String status;
  private final String message;
  private final BigDecimal amount;
  private final LocalDateTime date;
}
