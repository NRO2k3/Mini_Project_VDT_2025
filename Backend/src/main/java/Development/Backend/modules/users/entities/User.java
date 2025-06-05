package Development.Backend.modules.users.entities;
import java.time.LocalDateTime;
import java.util.List;

import Development.Backend.modules.products.entities.AppointmentCustomer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String email;
  private String password;
  private String phone;

  @Column(name="created_at", updatable=false)
  private LocalDateTime createdAt;

  @Column(name="updated_at")
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
  @JoinColumn(name = "role_id", referencedColumnName = "id")
  private Role roleId;

  @OneToMany(mappedBy = "userId")
  private List<AppointmentCustomer> appointment;
}

