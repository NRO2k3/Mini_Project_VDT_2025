package Development.Backend.modules.products.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import Development.Backend.modules.users.entities.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "appointments")
public class AppointmentCustomer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private LocalDateTime date;
  private String message;
  private String status;
  private BigDecimal amount;

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

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", referencedColumnName="id", nullable = false)
  private User userId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "product_id", referencedColumnName="id", nullable = false)
  private BankingProduct productId;

}