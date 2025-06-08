package Development.Backend.modules.products.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.products.dtos.requests.AppointmentCustomerRequest;
import Development.Backend.modules.products.entities.AppointmentCustomer;
import Development.Backend.modules.products.entities.BankingProduct;
import Development.Backend.modules.products.entities.TypeBanking;
import Development.Backend.modules.products.repositories.AppointmentCustomerRepository;
import Development.Backend.modules.products.repositories.BankingProductRepository;
import Development.Backend.modules.products.repositories.TypeBankingRepository;
import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.UserRepository;

@Service
public class AppointmentCustomerService {
  
  @Autowired
  private TypeBankingRepository typeBankingRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AppointmentCustomerRepository appointmentCustomerRepository;

  @Autowired
  private BankingProductRepository bankingProductRepository;

  public void createAppointmentService(AppointmentCustomerRequest request){
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = (userRepository.findByEmail(email)).orElseThrow(()-> new ErrorException("User Không Tồn Tại",HttpStatus.BAD_REQUEST));
    BankingProduct product = bankingProductRepository.findById(request.getProductId()).orElseThrow(() -> new ErrorException("Banking Product không tồn tại",HttpStatus.BAD_REQUEST));

    appointmentCustomerRepository.save(AppointmentCustomer.builder()
    .amount(request.getAmount())
    .productId(product)
    .userId(user)
    .date(request.getDate())
    .status("PENDING")
    .build());
  }

  public void updateAppointmentService(AppointmentCustomerRequest request){
    AppointmentCustomer appointmentCustomer = appointmentCustomerRepository.findById(request.getId()).orElseThrow(() -> new ErrorException("Appointment không tồn tại vui lòng tạo trước", HttpStatus.BAD_REQUEST));
  
    appointmentCustomer.setMessage(request.getMessage());
    appointmentCustomer.setStatus(request.getStatus());

    appointmentCustomerRepository.save(appointmentCustomer);
  }

  public void deleteAppointmentService(Long id){
    AppointmentCustomer appointmentCustomer = appointmentCustomerRepository.findById(id).orElseThrow(() -> new ErrorException("Appointment không tồn tại vui lòng tạo trước", HttpStatus.BAD_REQUEST));

    appointmentCustomerRepository.delete(appointmentCustomer);
  }

  public List<AppointmentCustomer> getAppointmentByTypeService(String type){
    TypeBanking type_obj = typeBankingRepository.findByName(type).orElseThrow(() -> new ErrorException("Type không tồn tại", HttpStatus.BAD_REQUEST));
    return type_obj.getBankingProduct().stream().flatMap(product -> product.getAppointment().stream()).collect(Collectors.toList());
  }

  public Page<AppointmentCustomer> getAppointmentUserAndTypeService(String type, int page, int size ){
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = (userRepository.findByEmail(email)).orElseThrow(()-> new ErrorException("User Không Tồn Tại",HttpStatus.BAD_REQUEST));
    TypeBanking product = typeBankingRepository.findByName(type).orElseThrow(() -> new ErrorException("Type không tồn tại", HttpStatus.BAD_REQUEST));
  
    Pageable pageable = PageRequest.of(page, size);
    List<BankingProduct> products = bankingProductRepository.findByTypeId(product);
    return appointmentCustomerRepository.findByUserIdAndProductIdInOrderByDateDesc(user, products, pageable);
  }

  public List<AppointmentCustomer> getAppointmentByEmailService(String email){
    User user = (userRepository.findByEmail(email)).orElseThrow(()-> new ErrorException("User Không Tồn Tại",HttpStatus.BAD_REQUEST));
    return user.getAppointment();
  }

  public Page<AppointmentCustomer> getAppointmentByTypePageService(String type, int page, int size){
    TypeBanking type_obj = typeBankingRepository.findByName(type).orElseThrow(() -> new ErrorException("Type không tồn tại", HttpStatus.BAD_REQUEST));

    List<BankingProduct> productIds = type_obj.getBankingProduct();

    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
  
    return appointmentCustomerRepository.findByProductIdIn(productIds, pageable);
  }

  public Page<AppointmentCustomer> getAppointmentByStatusService(String status, int page, int size){
    Pageable pageable = PageRequest.of(page, size);
    return appointmentCustomerRepository.findByStatusOrderByDateDesc(status, pageable);
  }
}
