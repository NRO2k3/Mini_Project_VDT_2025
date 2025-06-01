package Development.Backend.config.jwt.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import Development.Backend.config.jwt.services.CustomUserDetailsService;
import Development.Backend.config.jwt.services.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
  
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;
    private final ObjectMapper objectMapper;

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request){
      String path = request.getRequestURI();
      return path.startsWith("/api/v1/auth/login")||path.startsWith("/api/v1/auth/token/refresh")||path.startsWith("/api/v1/user/create");
    }

    @Override
    protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain) throws ServletException, IOException{
    
      try {
        log.info("JwtAuthFilter is called for URL: {}", request.getRequestURI());
        String jwt= null;
        String userId;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("access_token".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt == null) {
            sendErrorResponse(response, request, HttpServletResponse.SC_UNAUTHORIZED,
                "Xác thực không thành công", "Không tìm thấy Token trong cookie");
            log.error("Không có JWT trong cookie");
            return;
        }

        if(!jwtService.isTokenFormatValid(jwt)){
          sendErrorResponse(response, request, HttpServletResponse.SC_UNAUTHORIZED, "Xác thực không thành không", "Token Không đúng định dạng");
          log.error("Error Token Miss");
          return;
        }

        if(!jwtService.isSignatureValid(jwt)){
          sendErrorResponse(response, request, HttpServletResponse.SC_UNAUTHORIZED, "Xác thực không thành không", "Chữ ký không đúng");
          return;
        }

        if(!jwtService.isIssuerToken(jwt)){
          sendErrorResponse(response, request, HttpServletResponse.SC_UNAUTHORIZED, "Xác thực không thành không", "Nguồn Token không hợp lệ");
          return;
        }

        if(jwtService.isTokenExpired(jwt)){
          sendErrorResponse(response, request, HttpServletResponse.SC_UNAUTHORIZED, "Xác thực không thành không", "Token hết hạn");
          return;
        }

        userId = jwtService.extractUserId(jwt);
        log.info("userId {}", userId);
        if(userId != null && SecurityContextHolder.getContext().getAuthentication() == null){
          UserDetails userDetails = customUserDetailsService.loadUserByUsername(userId);
          String emailFromToken = jwtService.extractEmail(jwt);
          if(!emailFromToken.equals(userDetails.getUsername())){
            sendErrorResponse(response, request, HttpServletResponse.SC_UNAUTHORIZED, "Xác thực không thành không", "User Token Không chính xác");
            return;
          }

          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,  userDetails.getAuthorities());
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
          log.info("Xác thực tài khoản thành công: {}", userDetails.getUsername());
        }
        filterChain.doFilter(request, response);
      }
      catch (ServletException | IOException| ExpiredJwtException e) {
        sendErrorResponse(response, request, HttpServletResponse.SC_INTERNAL_SERVER_ERROR," Lỗi hệ thống", e.getMessage());
      }
    }

    private void sendErrorResponse(
      @NotNull HttpServletResponse response,
      @NotNull HttpServletRequest request,
      int statusCode,
      String error,
      String message
    ) throws IOException{
      response.setStatus(statusCode);
      response.setContentType("application/json; charset=UTF-8");

      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("Timestamp", System.currentTimeMillis());
      errorResponse.put("status", statusCode);
      errorResponse.put("error", error);
      errorResponse.put("message", message);
      errorResponse.put("path", request.getRequestURI());

      String jsonResponse = objectMapper.writeValueAsString(errorResponse);
      response.getWriter().write(jsonResponse);
    }
}

