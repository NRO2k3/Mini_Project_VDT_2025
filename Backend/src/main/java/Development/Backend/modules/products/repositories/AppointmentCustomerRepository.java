package Development.Backend.modules.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.modules.products.entities.AppointmentCustomer;
import Development.Backend.modules.products.entities.BankingProduct;
import Development.Backend.modules.users.entities.User;


@Repository
public interface AppointmentCustomerRepository extends JpaRepository<AppointmentCustomer, Long> {
  Optional<AppointmentCustomer> findByProductId(BankingProduct productId);
  Page<AppointmentCustomer> findByUserIdAndProductIdInOrderByDateDesc(User user, List<BankingProduct> product, Pageable pageable);
  Page<AppointmentCustomer> findByStatusOrderByDateDesc(String status, Pageable pageable);
  boolean existsByUserId(User userId);
  boolean existsByProductId(BankingProduct productId);
  Page<AppointmentCustomer> findByProductIdIn(List<BankingProduct> products, Pageable pageable);

}
