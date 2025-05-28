package Development.Backend.config.jwt.services;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Development.Backend.modules.users.entities.User;
import Development.Backend.modules.users.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException{

    User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new UsernameNotFoundException("User Không Tồn Tại"));
    String role = user.getRoleId().getName();
    return new org.springframework.security.core.userdetails.User(
      user.getEmail(),
      user.getPassword(),
      List.of(new SimpleGrantedAuthority(role))
    );
  }
}
