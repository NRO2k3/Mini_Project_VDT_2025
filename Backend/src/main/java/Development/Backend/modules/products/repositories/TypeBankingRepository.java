package Development.Backend.modules.products.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.modules.products.entities.TypeBanking;


@Repository
public interface  TypeBankingRepository extends JpaRepository<TypeBanking, Long>{
  boolean existsBy();
  Optional<TypeBanking> findByName(String name);
}
