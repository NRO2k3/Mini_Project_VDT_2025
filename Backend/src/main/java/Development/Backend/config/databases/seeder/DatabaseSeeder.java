package Development.Backend.config.databases.seeder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import Development.Backend.modules.products.entities.BankingProduct;
import Development.Backend.modules.products.entities.InterestRate;
import Development.Backend.modules.products.entities.TypeBanking;
import Development.Backend.modules.products.repositories.BankingProductRepository;
import Development.Backend.modules.products.repositories.InRateRepository;
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

  @Autowired
  private InRateRepository inRateRepository;

  @Autowired
  private BankingProductRepository bankingProductRepository;

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

    if(userRepository.count()==0){
      String passwordEncode = passwordEncoder.encode("password123");

      User user_0 = new User();
      user_0.setName("Tran du");
      user_0.setEmail("duvinhhb@gmail.com");
      user_0.setPassword(passwordEncode);
      Role role = roleRepository.findByName("ADMIN")
                          .orElseThrow(() -> new RuntimeException("Role not found"));
      user_0.setRoleId(role);
      user_0.setPhone("0348641265");
      userRepository.save(user_0);

      User user1 = new User();
      user1.setName("Tran Vinh");
      user1.setEmail("vinh@gmail.com");
      user1.setPassword(passwordEncode);
      role = roleRepository.findByName("ASSISTANT")
      .orElseThrow(() -> new RuntimeException("Role not found"));
      user1.setRoleId(role);
      user1.setPhone("0343241265");
      userRepository.save(user1);

      Faker faker = new Faker();
      Random random = new Random();

      Role adminRole = roleRepository.findByName("ADMIN")
      .orElseThrow(() -> new RuntimeException("Role ADMIN not found"));
      Role userRole = roleRepository.findByName("USER")
          .orElseThrow(() -> new RuntimeException("Role USER not found"));
      Role assistantRole = roleRepository.findByName("ASSISTANT")
          .orElseThrow(() -> new RuntimeException("Role ASSISTANT not found"));

      List<Role> roles = List.of(adminRole, userRole, assistantRole);

      int numberOfUsersToCreate = 100;

      for (int i = 0; i < numberOfUsersToCreate; i++) {
          User user = new User();
          user.setName(faker.name().fullName());
          String email = faker.name().username().toLowerCase() + "@gmail.com";
          user.setEmail(email);
          user.setPassword(passwordEncode);
          Role randomRole = roles.get(random.nextInt(roles.size()));
          user.setRoleId(randomRole);
          user.setPhone(faker.phoneNumber().cellPhone());
          userRepository.save(user);
      }
    }

  if(inRateRepository.count() == 0){
      Map<Integer, BigDecimal> fixedRates = Map.of(
        1, new BigDecimal("1.60"),
        2, new BigDecimal("1.60"),
        3, new BigDecimal("1.90"),
        6, new BigDecimal("2.90"),
        9, new BigDecimal("2.90"),
        12, new BigDecimal("4.60"),
        24, new BigDecimal("4.70"),
        36, new BigDecimal("4.70"),
        48, new BigDecimal("4.70"),
        60, new BigDecimal("4.70")
    );

    for (Map.Entry<Integer, BigDecimal> entry : fixedRates.entrySet()) {
        InterestRate rateEntry = new InterestRate();
        rateEntry.setTerm(entry.getKey());
        rateEntry.setRate(entry.getValue());
        inRateRepository.save(rateEntry);
    }
  }
  
  if(bankingProductRepository.count() == 0){
    Faker faker = new Faker();
    Random random = new Random();
    TypeBanking saving = typeBankingRepository.findByName("SAVING") .orElseThrow(() -> new RuntimeException("Type not found"));
    TypeBanking loan = typeBankingRepository.findByName("LOAN") .orElseThrow(() -> new RuntimeException("Type not found"));
    List<TypeBanking> types = List.of(saving, loan);
    int numberProduct = 10;
    for (int i = 1 ; i <= numberProduct; i++){
      bankingProductRepository.save(BankingProduct.builder()
      .name(faker.commerce().productName())
      .description(faker.commerce().productName())
      .minAmount(BigDecimal.valueOf(1000000))
      .maxAmount(BigDecimal.valueOf(1000000000))
      .typeId(types.get(random.nextInt(types.size())))
      .build()
      );
    }
  }
  }
}
