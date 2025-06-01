package Development.Backend.modules.users.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Development.Backend.modules.users.entities.Role;
import Development.Backend.modules.users.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
  boolean existsBy();
  boolean existsByEmail(String email);
  boolean existsByPhone(String phone);
  Optional<User> findByEmail(String email);
  Optional<User> findByPhone(String phone);
  List<User> findByRoleId(Role role);
}

