package Development.Backend.modules.products.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

import Development.Backend.modules.products.dtos.requests.InRateRequest;
import Development.Backend.modules.products.dtos.responses.InRateResponse;
import Development.Backend.modules.products.repositories.InRateRepository;
import Development.Backend.modules.products.services.InRateService;
import Development.Backend.modules.users.dtos.responses.ApiResponse;
import jakarta.validation.Valid;


@RestController
@Validated
@RequestMapping("/api/v1/interest_rate")
public class InRateController {

  @Autowired
  private InRateService inRateService;

  @Autowired
  private InRateRepository inRateRepository;

  @PostMapping("create")
  public ResponseEntity<ApiResponse<?>> createInRate(@Valid @RequestBody InRateRequest request) {
    inRateService.createInrateService(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Create InterestRate Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list")
  public ResponseEntity<ApiResponse<List<InRateResponse>>> listInRate() {
    List<InRateResponse> data = (inRateRepository.findAll(Sort.by(Sort.Direction.ASC, "term"))).stream().map(inRate -> InRateResponse
    .builder()
    .id(inRate.getId())
    .term(inRate.getTerm())
    .rate(inRate.getRate())
    .build()).collect(Collectors.toList());
    ApiResponse<List<InRateResponse>> response = ApiResponse.ok(data, "Create InterestRate Successfully");
    return ResponseEntity.ok(response);
  }
  
  @PutMapping("update")
  public ResponseEntity<ApiResponse<?>> updateInRate(@Valid @RequestBody InRateRequest request) {
      inRateService.updateInrateService(request);
      ApiResponse<?> response = ApiResponse.ok(null, "Update InterestRate Successfully");
      return ResponseEntity.ok(response);
  }

  @DeleteMapping("delete")
  public ResponseEntity<ApiResponse<?>> deleteInRate(@RequestParam Long id){
    inRateService.deleteInrateService(id);
    ApiResponse<?> response = ApiResponse.ok(null, "Delete InterestRate Successfully");
    return ResponseEntity.ok(response);
  }
}