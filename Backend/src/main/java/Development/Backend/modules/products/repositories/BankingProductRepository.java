package Development.Backend.modules.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.modules.products.entities.BankingProduct;
import Development.Backend.modules.products.entities.TypeBanking;

@Repository
public interface BankingProductRepository extends JpaRepository<BankingProduct, Object>{
  boolean existsByName(String name);
  Optional<BankingProduct> findByName(String name);
  Page<BankingProduct> findByTypeId(TypeBanking typeBanking, Pageable pageable);
  List<BankingProduct> findByTypeId(TypeBanking typeBanking);
}
