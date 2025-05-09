package src.main.java.com.carrental.respositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import src.main.java.com.carrental.models.Vehicle;
import src.main.java.com.carrental.models.VehicleStatus;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByStatus(VehicleStatus status);
}
