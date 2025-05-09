package src.main.java.com.carrental.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public double getDailyRentalCost() {
        return dailyRentalCost;
    }

    public void setDailyRentalCost(double dailyRentalCost) {
        this.dailyRentalCost = dailyRentalCost;
    }

    private String vehicleNumber;
    private String companyName;
    private String modelName;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    public VehicleStatus getStatus() {
        return status;
    }

    public void setStatus(VehicleStatus status) {
        this.status = status;
    }

    @Enumerated(EnumType.STRING)
    private VehicleStatus status = VehicleStatus.AVAILABLE;

    private double dailyRentalCost;

    public double getHourlyRentalCost() {
        return hourlyRentalCost;
    }

    public void setHourlyRentalCost(double hourlyRentalCost) {
        this.hourlyRentalCost = hourlyRentalCost;
    }

    private double hourlyRentalCost;

    private String imageUrl;  // ✅ New field to store image URL

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}

