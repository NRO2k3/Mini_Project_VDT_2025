package Development.Backend.modules.products.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.modules.products.entities.InterestRate;

@Repository
public interface InRateRepository extends JpaRepository<InterestRate, Long>{
  Boolean existsByTerm(Integer term);
  Optional<InterestRate> findByTerm(Integer term);
}
