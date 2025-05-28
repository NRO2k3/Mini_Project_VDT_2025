package Development.Backend.cronjob;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Development.Backend.config.jwt.repositories.BlacklistedTokenRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BlacklistTokenClean {
  @Autowired
  private  BlacklistedTokenRepository blacklistedTokenRepository;

  @Transactional
  @Scheduled(cron = "0 0 0 * * *")
  public void cleanupExpiredTokens(){
    LocalDateTime currentDateTime = LocalDateTime.now();
    int deletedCount = blacklistedTokenRepository.deleteByExpiryDateBefore(currentDateTime);
    log.info("Đã xóa: " + deletedCount + " token");
  }
}
