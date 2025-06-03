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

import Development.Backend.modules.products.dtos.requests.BankingProductRequest;
import Development.Backend.modules.products.dtos.responses.BankingProductResponse;
import Development.Backend.modules.products.dtos.responses.TypeBankingResponse;
import Development.Backend.modules.products.repositories.BankingProductRepository;
import Development.Backend.modules.products.repositories.TypeBankingRepository;
import Development.Backend.modules.products.services.BankingProductService;
import Development.Backend.modules.users.dtos.responses.ApiResponse;
import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/v1/banking_product")
public class BankingProductController {
  @Autowired
  private BankingProductService bankingProductService;

  @Autowired
  private BankingProductRepository bankingProductRepository;

  @Autowired
  private TypeBankingRepository typeBankingRepository;

  @PostMapping("create")
  public ResponseEntity<ApiResponse<?>> createBankingProduct(@Valid @RequestBody BankingProductRequest request){
    bankingProductService.createBankingProduct(request);
    ApiResponse<?> response = ApiResponse.ok(null, "Create BankingProduct Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list")
  public ResponseEntity<ApiResponse<List<BankingProductResponse>>> listBankingProduct(){
    List<BankingProductResponse> data = (bankingProductRepository.findAll()).stream().map(product -> BankingProductResponse
    .builder()
    .id(product.getId())
    .name(product.getName())
    .description(product.getDescription())
    .minAmount(product.getMinAmount())
    .maxAmount(product.getMaxAmount())
    .type(product.getTypeId().getName())
    .build()).collect(Collectors.toList());
    ApiResponse<List<BankingProductResponse>> response = ApiResponse.ok(data, "Get BankingProduct Successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping("list/type")
  public ResponseEntity<ApiResponse<List<TypeBankingResponse>>> listTypeBanking(){
    List<TypeBankingResponse> data = (typeBankingRepository.findAll()).stream().map(type -> TypeBankingResponse
    .builder()
    .id(type.getId())
    .name(type.getName())
    .build()).collect(Collectors.toList());
    ApiResponse<List<TypeBankingResponse>> response = ApiResponse.ok(data, "Get BankingProduct Successfully");
    return ResponseEntity.ok(response);
  }

  @PutMapping("update")
  public ResponseEntity<ApiResponse<?>> updateBankingProduct(@Valid @RequestBody BankingProductRequest request) {
    bankingProductService.updateBankingProductService(request);
      ApiResponse<?> response = ApiResponse.ok(null, "Update BankingProduct Successfully");
      return ResponseEntity.ok(response);
  }

  @DeleteMapping("delete")
  public ResponseEntity<ApiResponse<?>> deleteBankingProduct(@RequestParam Long id){
    bankingProductService.deleteBankingProductService(id);
    ApiResponse<?> response = ApiResponse.ok(null, "Delete BankingProduct Successfully");
    return ResponseEntity.ok(response);
  }
}