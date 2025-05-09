package src.main.java.com.carrental.models;


import java.util.Date;

public class ReservationResponse {
    private String modelName;
    private String vehicleNumber;
    private String vehicleStatus;
    private Date startDate;
    private Date endDate;
    private String paymentStatus;

    public ReservationResponse(String modelName, String vehicleNumber, String vehicleStatus, Date startDate, Date endDate, String paymentStatus) {
        this.modelName = modelName;
        this.vehicleNumber = vehicleNumber;
        this.vehicleStatus = vehicleStatus;
        this.startDate = startDate;
        this.endDate = endDate;
        this.paymentStatus = paymentStatus;
    }

    // Getters and Setters
    public String getModelName() { return modelName; }
    public void setModelName(String modelName) { this.modelName = modelName; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getVehicleStatus() { return vehicleStatus; }
    public void setVehicleStatus(String vehicleStatus) { this.vehicleStatus = vehicleStatus; }

    public Date getStartDate() { return startDate; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getEndDate() { return endDate; }
    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
}

