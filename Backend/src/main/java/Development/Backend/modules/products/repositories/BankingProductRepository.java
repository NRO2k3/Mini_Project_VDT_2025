package Development.Backend.modules.products.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.modules.products.entities.BankingProduct;

@Repository
public interface BankingProductRepository extends JpaRepository<BankingProduct, Object>{
  boolean existsByName(String name);
  Optional<BankingProduct> findByName(String name);
}
