package Development.Backend.modules.products.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import Development.Backend.modules.products.entities.AppointmentCustomer;
import Development.Backend.modules.products.repositories.AppointmentCustomerRepository;
import Development.Backend.modules.products.services.AppointmentCustomerService;
import Development.Backend.modules.users.dtos.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
  public ResponseEntity<ApiResponse<List<AppointmentCustomerResponse>>> listAppointment(){
    List<AppointmentCustomerResponse> data = (appointmentCustomerRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))).stream().map(appointment -> AppointmentCustomerResponse
    .builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productName(appointment.getProductId().getName())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()).collect(Collectors.toList());
    ApiResponse<List<AppointmentCustomerResponse>> response = ApiResponse.ok(data, "Get Appointment Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/filter")
  public ResponseEntity<ApiResponse<List<AppointmentCustomerResponse>>> getAppointmentByType(@RequestParam String type){
    List<AppointmentCustomerResponse> appointments = (appointmentCustomerService.getAppointmentByTypeService(type)).stream().map(appointment -> AppointmentCustomerResponse.builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productName(appointment.getProductId().getName())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()
    ).collect(Collectors.toList());
    ApiResponse<List<AppointmentCustomerResponse>> response = ApiResponse.ok(appointments, "Get BankingProduct Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/filter/email")
  public ResponseEntity<ApiResponse<List<AppointmentCustomerResponse>>> getAppointmentByEmail(@RequestParam String email){
    List<AppointmentCustomerResponse> appointments = (appointmentCustomerService.getAppointmentByEmailService(email)).stream().map(appointment -> AppointmentCustomerResponse.builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productName(appointment.getProductId().getName())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()
    ).collect(Collectors.toList());
    ApiResponse<List<AppointmentCustomerResponse>> response = ApiResponse.ok(appointments, "Get BankingProduct Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/user/filter")
  public ResponseEntity<ApiResponse<?>> getAppointmentUserAndType(@RequestParam String type, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size){
    Page<AppointmentCustomer> appointmentPage = appointmentCustomerService.getAppointmentUserAndTypeService(type, page, size);
    List<AppointmentCustomerResponse> appointments = appointmentPage.getContent().stream().map(appointment -> AppointmentCustomerResponse.builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productName(appointment.getProductId().getName())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()
    ).collect(Collectors.toList());

    Map<String, Object> result = new HashMap<>();
    result.put("appointments", appointments);
    result.put("totalPages", appointmentPage.getTotalPages());
    result.put("currentPage", appointmentPage.getNumber());
    result.put("totalElements", appointmentPage.getTotalElements());

    ApiResponse<?> response = ApiResponse.ok(result, "Get Appointments Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/filter/status")
  public ResponseEntity<ApiResponse<?>> getAppointmentByStatus(@RequestParam String status, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size){
    log.info(status);
    Page<AppointmentCustomer> appointmentPage = appointmentCustomerService.getAppointmentByStatusService(status, page, size);
    List<AppointmentCustomerResponse> appointments = appointmentPage.getContent().stream().map(appointment -> AppointmentCustomerResponse.builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productName(appointment.getProductId().getName())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()
    ).collect(Collectors.toList());

    Map<String, Object> result = new HashMap<>();
    result.put("appointments", appointments);
    result.put("totalPages", appointmentPage.getTotalPages());
    result.put("currentPage", appointmentPage.getNumber());
    result.put("totalElements", appointmentPage.getTotalElements());

    ApiResponse<?> response = ApiResponse.ok(result, "Get Appointments Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/page")
  public ResponseEntity<ApiResponse<?>> listAppointmentPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size){
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
    Page<AppointmentCustomer> appointmentPage = appointmentCustomerRepository.findAll(pageable);
    List<AppointmentCustomerResponse> appointments = appointmentPage.getContent().stream().map(appointment -> AppointmentCustomerResponse
    .builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productName(appointment.getProductId().getName())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()).collect(Collectors.toList());

    Map<String, Object> result = new HashMap<>();
    result.put("appointments", appointments);
    result.put("totalPages", appointmentPage.getTotalPages());
    result.put("currentPage", appointmentPage.getNumber());
    result.put("totalElements", appointmentPage.getTotalElements());

    ApiResponse<?> response = ApiResponse.ok(result, "Get Appointments Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/typeProduct")
  public ResponseEntity<ApiResponse<?>> getAppointmentByTypePage(@RequestParam String type, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size){

    Page<AppointmentCustomer> appointmentPage = appointmentCustomerService.getAppointmentByTypePageService(type, page, size);

    List<AppointmentCustomerResponse> appointments = appointmentPage.getContent().stream().map(appointment -> AppointmentCustomerResponse.builder()
    .id(appointment.getId())
    .email(appointment.getUserId().getEmail())
    .productName(appointment.getProductId().getName())
    .productType(appointment.getProductId().getTypeId().getName())
    .status(appointment.getStatus())
    .message(appointment.getMessage())
    .amount(appointment.getAmount())
    .date(appointment.getDate())
    .build()
    ).collect(Collectors.toList());

    Map<String, Object> result = new HashMap<>();
    result.put("appointments", appointments);
    result.put("totalPages", appointmentPage.getTotalPages());
    result.put("currentPage", appointmentPage.getNumber());
    result.put("totalElements", appointmentPage.getTotalElements());

    ApiResponse<?> response = ApiResponse.ok(result, "Get Appointments Successfully");
    return ResponseEntity.ok(response);
  }
}
