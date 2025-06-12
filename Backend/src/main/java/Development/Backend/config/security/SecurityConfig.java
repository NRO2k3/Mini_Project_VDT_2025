package Development.Backend.config.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import Development.Backend.config.jwt.config.JwtAuthFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/v1/interest_rate/create",
                                            "/api/v1/interest_rate/update",
                                            "/api/v1/interest_rate/delete"
                                            ).hasAuthority("ADMIN")
                .requestMatchers("/api/v1/banking_product/create",
                                            "/api/v1/banking_product/update",
                                            "/api/v1/banking_product/delete",
                                            "/api/v1/banking_product/list/product/type",
                                            "/api/v1/banking_product/list/page"
                                            ).hasAuthority("ADMIN")
                .requestMatchers("/api/v1/user/list",
                                            "/api/v1/user/list/filter",
                                            "/api/v1/user/delete",
                                            "/api/v1/user/update",
                                            "/api/v1/user/list/role",
                                            "/api/v1/user/me"
                                            ).hasAuthority("ADMIN")
                .requestMatchers("/api/v1/appointment/update",
                                            "/api/v1/appointment/list/role",
                                            "/api/v1/appointment/list/filter",
                                            "/api/v1/appointment/list/filter/status"
                                            ).hasAnyAuthority("ADMIN", "ASSISTANT")
                .requestMatchers("/api/v1/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("https://localhost","https://192.168.1.5",
        "https://localhost:3000","https://192.168.1.5:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
