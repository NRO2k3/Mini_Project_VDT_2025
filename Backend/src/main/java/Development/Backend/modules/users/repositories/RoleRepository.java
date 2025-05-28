package Development.Backend.modules.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import Development.Backend.modules.users.entities.Role;

public interface  RoleRepository extends JpaRepository<Role, Long>{
  boolean existsBy();
}
