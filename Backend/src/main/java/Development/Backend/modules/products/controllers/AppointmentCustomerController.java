package Development.Backend.modules.products.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Development.Backend.modules.products.dtos.requests.AppointmentCustomerRequest;
import Development.Backend.modules.products.dtos.responses.AppointmentCustomerResponse;
import Development.Backend.modules.products.repositories.AppointmentCustomerRepository;
import Development.Backend.modules.products.services.AppointmentCustomerService;
import Development.Backend.modules.users.dtos.responses.ApiResponse;
import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/v1/appointment")
public class AppointmentCustomerController {

  @Autowired
  private AppointmentCustomerService appointmentCustomerService;

  @Autowired
  private AppointmentCustomerRepository appointmentCustomerRepository;

  @PostMapping("create")
  public ResponseEntity<ApiResponse<?>> createAppointment(@Valid @RequestBody AppointmentCustomerRequest request){
    appointmentCustomerService.createAppointmentService(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Create Appointment Successfully");
    return ResponseEntity.ok(response);
  }
  
  @PutMapping("update")
  public ResponseEntity<ApiResponse<?>> updateAppointment(@RequestBody AppointmentCustomerRequest request){
    appointmentCustomerService.updateAppointmentService(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Update Appointment Successfully");
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("delete")
  public ResponseEntity<ApiResponse<?>> deleteAppointment(@RequestParam Long id){
    appointmentCustomerService.deleteAppointmentService(id);
    ApiResponse<?> response = ApiResponse.ok(null, "Delete Appointment Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list")
  public ResponseEntity<ApiResponse<List<AppointmentCustomerResponse>>> listBankingProduct(){
    List<AppointmentCustomerResponse> data = (appointmentCustomerRepository.findAll()).stream().map(appointment -> AppointmentCustomerResponse
    .builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()).collect(Collectors.toList());
    ApiResponse<List<AppointmentCustomerResponse>> response = ApiResponse.ok(data, "Get Appointment Successfully");
    return ResponseEntity.ok(response);
  }
}
