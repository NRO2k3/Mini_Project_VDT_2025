package Development.Backend.modules.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.modules.products.entities.AppointmentCustomer;
import Development.Backend.modules.products.entities.BankingProduct;
import Development.Backend.modules.users.entities.User;


@Repository
public interface AppointmentCustomerRepository extends JpaRepository<AppointmentCustomer, Long> {
  Optional<AppointmentCustomer> findByProductId(BankingProduct productId);
  Optional<AppointmentCustomer> findByUserId(User userId);
  List<AppointmentCustomer> findByStatusOrderByDateDesc(String status);
  boolean existsByUserId(User userId);
  boolean existsByProductId(BankingProduct productId);
}
