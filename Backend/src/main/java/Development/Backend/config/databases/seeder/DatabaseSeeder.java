package Development.Backend.config.databases.seeder;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import Development.Backend.modules.products.entities.TypeBanking;
import Development.Backend.modules.products.repositories.TypeBankingRepository;
import Development.Backend.modules.users.entities.Role;
import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.RoleRepository;
import Development.Backend.modules.users.repositories.UserRepository;
import jakarta.transaction.Transactional;

@Component
public class DatabaseSeeder implements CommandLineRunner{

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private TypeBankingRepository typeBankingRepository;

  @Override
  @Transactional
  public void run(String... args) throws  Exception{
    System.out.println("Something Seeding ....");
    if(!roleRepository.existsBy()){
      Role newRole_0 = new Role();
      newRole_0.setName("ADMIN");
      roleRepository.save(newRole_0);

      Role newRole1 = new Role();
      newRole1.setName("USER");
      roleRepository.save(newRole1);

      Role newRole2 = new Role();
      newRole2.setName("ASSISTANT");
      roleRepository.save(newRole2);

    }

    if(!typeBankingRepository.existsBy()){
      typeBankingRepository.saveAll(List.of(
        TypeBanking.builder().name("SAVING").build(),
        TypeBanking.builder().name("LOAN").build(),
        TypeBanking.builder().name("INSURANCE").build(),
        TypeBanking.builder().name("CARD").build(),
        TypeBanking.builder().name("INVEST").build()
    ));
    }

    if(!userRepository.existsBy()){
      String passwordEncode = passwordEncoder.encode("password123");

      User user_0 = new User();
      user_0.setName("Tran du");
      user_0.setEmail("duvinhhb@gmail.com");
      user_0.setPassword(passwordEncode);
      Role role = roleRepository.findById(1L)
                          .orElseThrow(() -> new RuntimeException("Role not found"));
      user_0.setRoleId(role);
      user_0.setPhone("0348641265");
      userRepository.save(user_0);

      User user1 = new User();
      user1.setName("Tran Vinh");
      user1.setEmail("vinh@gmail.com");
      user1.setPassword(passwordEncode);
      role = roleRepository.findById(2L)
      .orElseThrow(() -> new RuntimeException("Role not found"));
      user1.setRoleId(role);
      user1.setPhone("0343241265");
      userRepository.save(user1);
    }
  }
}
