package src.main.java.com.carrental.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import src.main.java.com.carrental.models.Vehicle;
import src.main.java.com.carrental.models.VehicleStatus;
import src.main.java.com.carrental.respositories.VehicleRepository;

import java.util.List;
import java.util.Optional;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VehicleService {

    private static final String UPLOAD_DIR = "uploads/vehicle-images/";  // ✅ Folder to store images
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public List<Vehicle> getAvailableVehicles() {
        return vehicleRepository.findByStatus(VehicleStatus.AVAILABLE);
    }


    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setCompanyName(updatedVehicle.getCompanyName());
            vehicle.setModelName(updatedVehicle.getModelName());
            vehicle.setVehicleType(updatedVehicle.getVehicleType());
            vehicle.setDailyRentalCost(updatedVehicle.getDailyRentalCost());
            vehicle.setHourlyRentalCost(updatedVehicle.getHourlyRentalCost());
            vehicle.setStatus(updatedVehicle.getStatus());
            return vehicleRepository.save(vehicle);
        }).orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    public String uploadVehicleImage(Long vehicleId, MultipartFile file) throws IOException {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // ✅ Generate unique filename
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        // ✅ Save file to disk
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        // ✅ Save image URL in database
        String imageUrl = "http://localhost:8080/" + UPLOAD_DIR + fileName;
        vehicle.setImageUrl(imageUrl);
        vehicleRepository.save(vehicle);

        return imageUrl;
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
