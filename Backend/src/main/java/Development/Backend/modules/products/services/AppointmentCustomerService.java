package Development.Backend.modules.products.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.products.dtos.requests.AppointmentCustomerRequest;
import Development.Backend.modules.products.entities.AppointmentCustomer;
import Development.Backend.modules.products.entities.BankingProduct;
import Development.Backend.modules.products.repositories.AppointmentCustomerRepository;
import Development.Backend.modules.products.repositories.BankingProductRepository;
import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.UserRepository;

@Service
public class AppointmentCustomerService {
  
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
}
