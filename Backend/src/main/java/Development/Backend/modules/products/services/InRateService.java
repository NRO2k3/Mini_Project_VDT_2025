package Development.Backend.modules.products.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.products.dtos.requests.InRateRequest;
import Development.Backend.modules.products.entities.InterestRate;
import Development.Backend.modules.products.repositories.InRateRepository;

@Service
public class InRateService {
  
  @Autowired
  private InRateRepository inRateRepository;

  public void createInrateService(InRateRequest request){
    if(inRateRepository.existsByTerm(request.getTerm())){
      throw new ErrorException("Term đã tồn tại", HttpStatus.BAD_REQUEST);
    }

    InterestRate interestRate = InterestRate.builder()
    .term(request.getTerm())
    .rate(request.getRate())
    .build();

    inRateRepository.save(interestRate);
  }

  public void updateInrateService(InRateRequest request){

    InterestRate interestRate = inRateRepository.findByTerm(request.getTerm()).orElseThrow(() -> new ErrorException("Term không tồn tại vui lòng tạo trước", HttpStatus.BAD_REQUEST));
    interestRate.setTerm(request.getTerm());
    interestRate.setRate(request.getRate());
    inRateRepository.save(interestRate);
  }

  public void deleteInrateService(Long id){
    InterestRate obj = inRateRepository.findById(id).orElseThrow(()-> new ErrorException("Term không tồn tại", HttpStatus.BAD_REQUEST));
    inRateRepository.delete(obj);
  }
}