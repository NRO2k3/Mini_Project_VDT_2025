package Development.Backend.modules.products.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.products.dtos.requests.BankingProductRequest;
import Development.Backend.modules.products.entities.BankingProduct;
import Development.Backend.modules.products.entities.TypeBanking;
import Development.Backend.modules.products.repositories.BankingProductRepository;
import Development.Backend.modules.products.repositories.TypeBankingRepository;

@Service
public class BankingProductService {
  @Autowired
  private BankingProductRepository bankingProductRepository;

  @Autowired
  private TypeBankingRepository typeBankingRepository;

  public void createBankingProduct(BankingProductRequest request){
    if(bankingProductRepository.existsByName(request.getName())){
      throw new ErrorException("BankingProduct đã tồn tại", HttpStatus.BAD_REQUEST);
    }
    TypeBanking type = typeBankingRepository.findByName(request.getType())
    .orElseThrow(() -> new ErrorException("Type not found", HttpStatus.BAD_REQUEST));

    bankingProductRepository.save(BankingProduct.builder()
    .name(request.getName())
    .description(request.getDescription())
    .minAmount(request.getMinAmount())
    .maxAmount(request.getMaxAmount())
    .typeId(type)
    .build());
  }

  public void updateBankingProductService(BankingProductRequest request){
    BankingProduct bankingProduct = bankingProductRepository.findById(request.getId()).orElseThrow(() -> new ErrorException("Product không tồn tại vui lòng tạo trước", HttpStatus.BAD_REQUEST));
    TypeBanking typeId = typeBankingRepository.findByName(request.getType()).orElseThrow(() -> new ErrorException("Type not found", HttpStatus.BAD_REQUEST));
    bankingProduct.setName(request.getName());
    bankingProduct.setDescription(request.getDescription());
    bankingProduct.setMinAmount(request.getMinAmount());
    bankingProduct.setMaxAmount(request.getMaxAmount());
    bankingProduct.setTypeId(typeId);
    bankingProductRepository.save(bankingProduct);
  }

  public void deleteBankingProductService(Long id){
    BankingProduct obj = bankingProductRepository.findById(id).orElseThrow(()-> new ErrorException("Product không tồn tại", HttpStatus.BAD_REQUEST));
    bankingProductRepository.delete(obj);
  }

  public List<BankingProduct> getProductByTypeService(String type){
    TypeBanking type_obj = typeBankingRepository.findByName(type).orElseThrow(() -> new ErrorException("Type không tồn tại", HttpStatus.BAD_REQUEST));
    return type_obj.getBankingProduct();
  }

  public Page<BankingProduct> getProductByTypePageService(String type, int page, int size){
    TypeBanking type_obj = typeBankingRepository.findByName(type).orElseThrow(() -> new ErrorException("Type không tồn tại", HttpStatus.BAD_REQUEST));
    Pageable pageable = PageRequest.of(page,size);
    return bankingProductRepository.findByTypeId(type_obj, pageable);
  }
}
