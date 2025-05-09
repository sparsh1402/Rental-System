package src.main.java.com.carrental.respositories;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import src.main.java.com.carrental.models.Reservation;
import src.main.java.com.carrental.models.ReservationStatus;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByStatus(ReservationStatus status);
}
