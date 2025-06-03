package Development.Backend.modules.products.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "interest_rates")
public class InterestRate {

  @Id
  @GeneratedValue( strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Integer term;

  @Column(precision = 4, scale = 2, nullable = false)
  private BigDecimal rate;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreated(){
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }
  @PreUpdate
  protected void onUpdate(){
    updatedAt = LocalDateTime.now();
  }
}
