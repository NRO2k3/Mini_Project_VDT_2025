package Development.Backend.handlers.handle_exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import Development.Backend.handlers.custom_exception.ErrorException;
import Development.Backend.modules.users.dtos.responses.ApiResponse;

@ControllerAdvice
public class GlobalHandleException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidException(MethodArgumentNotValidException ex){
      Map <String, String> errors = new HashMap<>();
      ex.getBindingResult().getAllErrors().forEach((error)->{
        String fieldName =  ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
      });
      ApiResponse <?> errResource = ApiResponse.error_data(errors,"Có vấn đề xẩy ra");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errResource);
    }
  
    @ExceptionHandler(ErrorException.class)
      public ResponseEntity<ApiResponse<?>> handleException(ErrorException ex) {
        ApiResponse<?> error = ApiResponse.error(ex.getMessage());
          return ResponseEntity.status(ex.getStatus()).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleException(Exception ex) {
      ApiResponse<?> error = ApiResponse.error("Internal server error");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

}
