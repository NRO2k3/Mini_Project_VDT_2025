package Development.Backend.config.jwt.repositories;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.config.jwt.entities.BlacklistedToken;

@Repository
public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, Long> {
  boolean existsByToken(String token);
  int deleteByExpiryDateBefore(LocalDateTime currentDateTime);
}